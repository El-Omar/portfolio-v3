import { Request, RequestHandler, Response } from 'express';
import { Project } from '../models/project.model';
import { ParamsDictionary } from 'express-serve-static-core';

export const getProjects: RequestHandler = async (_: Request, res: Response) => {
  try {
    const projects = await Project.find()
      .sort({ featured: -1, order: 1, startDate: -1 })
      .select('-__v');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the projects', error });
  }
};


interface ProjectParams extends ParamsDictionary {
  slug: string;
}

export const getProjectBySlug: RequestHandler<ProjectParams> = async (
  req,
  res,
) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug }).select(
      '-__v'
    );

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
};