import { RequestHandler } from "express";
import { Project } from "../models/project.model";
import {
  createPaginationResponse,
  getPaginationParams,
} from "../util/pagination";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../schemas/project.schema";
import { generateEtag, compareEtags } from "../util/etag";
import { BadRequestError, NotFoundError } from "../util/errors";
import {
  ApiResponse,
  GetProjectsQuery,
  Project as ProjectType,
} from "@portfolio-v3/shared";
import { S3Service } from "../services/s3.service";
import { getProjection } from "../util/projection";

type ReceivedProjectQuery = GetProjectsQuery & {
  published?: string;
  featured?: string;
};

// GET projects endpoint: /projects
export const getProjects: RequestHandler<
  {},
  ApiResponse<ProjectType[]>,
  {},
  ReceivedProjectQuery
> = async (req, res, next) => {
  try {
    const { featured, fields, include = true, published } = req.query;
    const query: GetProjectsQuery = {};

    if (published !== undefined) {
      query.published = published === "true";
    }

    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    const projection = getProjection(fields, include);

    const pagination = getPaginationParams({
      page: req.query.page,
      limit: req.query.limit,
    });

    const [projects, total] = await Promise.all([
      Project.find(query)
        .select(projection)
        .sort({ order: 1, createdAt: -1 })
        .limit(pagination.limit)
        .skip(pagination.offset),
      Project.countDocuments(query),
    ]);

    const projectDocs = projects.map((project) => {
      const doc = project.toObject();
      return {
        ...doc,
        _etag: generateEtag(doc),
      };
    });

    res.json({
      status: "success",
      data: projectDocs,
      pagination: createPaginationResponse(
        total,
        pagination.page,
        pagination.limit
      ),
    });
  } catch (error) {
    next(error);
  }
};

// GET project by slug endpoint: /projects/:slug
export const getProjectBySlug: RequestHandler<
  { slug: string },
  ApiResponse<ProjectType>
> = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      throw new NotFoundError("Project not found");
    }

    const etag = generateEtag(project);

    const ifNoneMatch = req.header("If-None-Match");
    if (ifNoneMatch && compareEtags(ifNoneMatch, etag)) {
      res.status(304).end();
      return;
    }

    const projectWithEtag = {
      ...project.toObject(),
      _etag: etag,
    };

    res.json({
      status: "success",
      data: projectWithEtag,
    });
  } catch (error) {
    next(error);
  }
};

// POST projects endpoint: /projects
export const createProject: RequestHandler<
  {},
  ApiResponse<ProjectType>,
  CreateProjectInput
> = async (req, res, next) => {
  try {
    const { ...projectData } = req.body;
    const newProject = new Project(projectData);

    await newProject.save();

    res.status(201).json({
      status: "success",
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH projects endpoint: /projects/:slug
export const updateProject: RequestHandler<
  { slug: string },
  ApiResponse<ProjectType>,
  UpdateProjectInput
> = async (req, res, next) => {
  try {
    const currentProject = await Project.findOne({ slug: req.params.slug });
    if (!currentProject) {
      throw new NotFoundError("Project not found");
    }

    const ifMatch = req.header("If-Match");
    if (!ifMatch) {
      throw new BadRequestError(
        "Precondition Required: If-Match header is required",
        428
      );
    }

    const currentEtag = generateEtag(currentProject);
    if (!compareEtags(ifMatch, currentEtag)) {
      throw new BadRequestError(
        "Precondition Failed: Resource has been modified",
        412
      );
    }

    // Handle main image deletion
    if (
      req.body.imageUrl &&
      currentProject.imageUrl &&
      req.body.imageUrl !== currentProject.imageUrl
    ) {
      try {
        const s3Service = S3Service.getInstance();
        const oldFileKey = s3Service.getFileKey(currentProject.imageUrl);
        await s3Service.deleteFile(oldFileKey);
      } catch (error) {
        console.error("Failed to delete old image:", error);
      }
    }

    // Handle additional images deletion
    if (req.body.additionalImages) {
      const oldUrls =
        currentProject.additionalImages?.map((img) => img.url) || [];
      const newUrls = req.body.additionalImages.map((img) => img.url);
      const urlsToDelete = oldUrls.filter((url) => !newUrls.includes(url));

      if (urlsToDelete.length > 0) {
        try {
          const s3Service = S3Service.getInstance();
          await Promise.all(
            urlsToDelete.map((url) => {
              const key = s3Service.getFileKey(url);
              return s3Service.deleteFile(key);
            })
          );
        } catch (error) {
          console.error("Failed to delete old additional images:", error);
        }
      }
    }

    const updatedProject = await currentProject
      .set({
        ...currentProject.toObject(),
        ...req.body,
      })
      .save();

    res.json({
      status: "success",
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE projects endpoint: /projects/:slug
export const deleteProject: RequestHandler<{ slug: string }> = async (
  req,
  res,
  next
) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      throw new NotFoundError("Project not found");
    }

    const ifMatch = req.header("If-Match");
    if (!ifMatch) {
      throw new BadRequestError(
        "Precondition Required: If-Match header is required",
        428
      );
    }

    const currentEtag = generateEtag(project);
    if (!compareEtags(ifMatch, currentEtag)) {
      throw new BadRequestError(
        "Precondition Failed: Resource has been modified",
        412
      );
    }

    await project.deleteOne();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
