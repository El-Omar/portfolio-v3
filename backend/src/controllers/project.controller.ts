import { RequestHandler } from "express";
import { Project } from "../models/project.model";
import {
  createPaginationResponse,
  getPaginationParams,
} from "../util/pagination";
import { mongodb_duplicateKeyError } from "../util/mongodbErrors";
import {
  CreateProjectInput,
  ProjectDocument,
  UpdateProjectInput,
} from "../schemas/project.schema";
import { generateEtag, validateEtag } from "../util/etag";

type GetProjectsQuery = {
  page?: number;
  featured?: boolean;
  limit?: number;
};

// GET PROJECTS /projects
export const getProjects: RequestHandler<{}, {}, {}, GetProjectsQuery> = async (
  req,
  res
) => {
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
      data: projects,
      pagination: createPaginationResponse(total, pagination),
    });

    return;
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// GET BY SLUG /projects/:slug
export const getProjectBySlug: RequestHandler<{ slug: string }> = async (
  req,
  res
) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error });
  }
};

// POST /projects
export const createProject: RequestHandler<{}, {}, CreateProjectInput> = async (
  req,
  res
) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    if (mongodb_duplicateKeyError(error)) {
      res
        .status(400)
        .json({ message: "Project with this slug already exists" });
      return;
    }

    res.status(500).json({ message: "Error creating project", error });
  }
};

// PATCH /projects/:slug
export const updateProject: RequestHandler<
  { slug: string },
  ProjectDocument | Record<string, unknown> | null,
  UpdateProjectInput
> = async (req, res) => {
  try {
    const currentProject = await Project.findOne({ slug: req.params.slug });
    if (!currentProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    const currentEtag = generateEtag(currentProject);
    const clientEtag = req.header("If-Match");
    const { isValid, statusCode, message } = validateEtag(
      currentEtag,
      clientEtag
    );

    if (!isValid) {
      res.status(statusCode).json({ message });
      return;
    }

    const updatedProject = await currentProject
      .set({
        ...currentProject.toObject(),
        ...req.body,
      })
      .save();

    res.json(updatedProject);
  } catch (error) {
    if (mongodb_duplicateKeyError(error)) {
      res
        .status(400)
        .json({ message: "Project with this slug already exists" });
      return;
    }

    res.status(500).json({ message: "Error updating project", error });
  }
};

// DELETE /projects/:slug
export const deleteProject: RequestHandler<{ slug: string }> = async (
  req,
  res
) => {
  try {
    const currentProject = await Project.findOne({ slug: req.params.slug });
    if (!currentProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    const currentEtag = generateEtag(currentProject);
    const clientEtag = req.header("If-Match");
    const { isValid, statusCode, message } = validateEtag(
      currentEtag,
      clientEtag
    );

    if (!isValid) {
      res.status(statusCode).json({ message });
      return;
    }

    await Project.deleteOne({ slug: req.params.slug });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};
