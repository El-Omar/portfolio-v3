import { Request, Response } from 'express';
import { Project } from '../models/project.model';
import {
  createPaginationResponse,
  getPaginationParams,
} from '../util/pagination';
import { mongodb_duplicateKeyError } from '../util/mongodbErrors';
import { CreateProjectInput, UpdateProjectInput } from '../schemas/project.schema';

interface GetProjectsQuery {
  page?: number;
  featured?: boolean;
  limit?: number;
}

// GET PROJECTS /projects
export const getProjects = async (
  req: Request<{}, any, any, GetProjectsQuery>,
  res: Response
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
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

// GET BY SLUG /projects/:slug
export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project' });
  }
};

// POST /projects
export const createProject = async (
  req: Request<{}, any, CreateProjectInput>,
  res: Response
) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    if (mongodb_duplicateKeyError(error)) {
      res
        .status(400)
        .json({ message: 'Project with this slug already exists' });
    }

    res.status(500).json({ message: 'Error creating project' });
  }
};

// PATCH /projects/:slug
export const updateProject = async (
  req: Request<{ slug: string }, any, UpdateProjectInput>,
  res: Response
) => {
  try {
    const currentProject = await Project.findOne({ slug: req.params.slug });
    if (!currentProject) {
      res.status(404).json({ message: 'Project not found' });
    }

    // Only update fields that were sent
    const updatedProject = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updatedProject);
  } catch (error) {
    if (mongodb_duplicateKeyError(error)) {
      res
        .status(400)
        .json({ message: 'Project with this slug already exists' });
    }

    res.status(500).json({ message: 'Error updating project' });
  }
};

// DELETE /projects/:slug
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOneAndDelete({ slug: req.params.slug });

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
};
