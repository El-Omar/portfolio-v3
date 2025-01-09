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
import {
  generateEtag,
  compareEtags,
} from "../util/etag";
import { BadRequestError, NotFoundError } from "../util/errors";
import {
  ApiResponse,
  PaginationParams,
  Project as ProjectType,
} from "@portfolio-v3/shared";
import { S3Service } from "../services/s3.service";

type GetProjectsQuery = PaginationParams & {
  featured?: boolean;
};

// GET PROJECTS /projects
export const getProjects: RequestHandler<
  {},
  ApiResponse<ProjectType[]>,
  {},
  GetProjectsQuery
> = async (req, res, next) => {
  try {
    const { featured } = req.query;
    const query = featured ? { featured: true } : {};

    const pagination = getPaginationParams({
      page: req.query.page,
      limit: req.query.limit,
    });

    const [projects, total] = await Promise.all([
      Project.find(query)
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

// GET BY SLUG /projects/:slug
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

// POST /projects
export const createProject: RequestHandler<
  {},
  ApiResponse<ProjectType>,
  CreateProjectInput
> = async (req, res, next) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();

    res.status(201).json({
      status: "success",
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /projects/:slug
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

// DELETE /projects/:slug
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

    if (project.imageUrl) {
      try {
        const s3Service = S3Service.getInstance();
        const fileKey = s3Service.getFileKey(project.imageUrl);
        await s3Service.deleteFile(fileKey);
      } catch (error) {
        console.error("Failed to delete project image:", error);
      }
    }

    await Project.deleteOne({ slug: req.params.slug });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
