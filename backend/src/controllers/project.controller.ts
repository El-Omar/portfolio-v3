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
import { generateEtag, validateEtag } from "../util/etag";
import { BadRequestError, NotFoundError } from "../util/errors";
import { ApiResponse, Project as ProjectType } from "@portfolio-v3/shared";
import { S3Service } from "../services/s3.service";

type GetProjectsQuery = {
  page?: number;
  featured?: boolean;
  limit?: number;
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

    res.json({
      status: "success",
      data: projects,
      pagination: createPaginationResponse(total, pagination),
    });

    return;
  } catch (error) {
    next(error);
  }
};

// GET BY SLUG /projects/:slug
export const getProjectBySlug: RequestHandler<
  { slug: string },
  ProjectType
> = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      throw new NotFoundError("Project not found");
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// POST /projects
export const createProject: RequestHandler<
  {},
  ProjectType,
  CreateProjectInput
> = async (req, res, next) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

// PATCH /projects/:slug
export const updateProject: RequestHandler<
  { slug: string },
  ProjectType,
  UpdateProjectInput
> = async (req, res, next) => {
  try {
    const currentProject = await Project.findOne({ slug: req.params.slug });
    if (!currentProject) {
      throw new NotFoundError("Project not found");
    }

    const currentEtag = generateEtag(currentProject);
    const clientEtag = req.header("If-Match");
    const { isValid, statusCode, message } = validateEtag(
      currentEtag,
      clientEtag
    );

    if (!isValid) {
      throw new BadRequestError(message, statusCode);
    }

    // If updating image, delete old one
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
        // Continue with update even if delete fails
      }
    }

    const updatedProject = await currentProject
      .set({
        ...currentProject.toObject(),
        ...req.body,
      })
      .save();

    res.json(updatedProject);
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
    const currentProject = await Project.findOne({ slug: req.params.slug });
    if (!currentProject) {
      throw new NotFoundError("Project not found");
    }

    const currentEtag = generateEtag(currentProject);
    const clientEtag = req.header("If-Match");
    const { isValid, statusCode, message } = validateEtag(
      currentEtag,
      clientEtag
    );

    if (!isValid) {
      throw new BadRequestError(message, statusCode);
    }

    // Delete associated image if exists
    if (currentProject.imageUrl) {
      try {
        const s3Service = S3Service.getInstance();
        const fileKey = s3Service.getFileKey(currentProject.imageUrl);
        await s3Service.deleteFile(fileKey);
      } catch (error) {
        console.error("Failed to delete project image:", error);
        // Continue with project deletion even if image delete fails
      }
    }

    await Project.deleteOne({ slug: req.params.slug });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
