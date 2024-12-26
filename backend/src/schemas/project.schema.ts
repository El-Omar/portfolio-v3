import { Document } from "mongoose";
import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().min(1),
  technologies: z.array(z.string()).min(1),
  imageUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  order: z.number().optional(),
});

export const createProjectSchema = z.object({
  body: projectSchema,
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

const projectPartialSchema = projectSchema.partial();

export const updateProjectSchema = z.object({
  body: projectPartialSchema,
  query: z.object({}).optional(),
  params: z.object({
    slug: z.string(),
  }),
});

export type CreateProjectInput = z.infer<typeof projectSchema>;
export type UpdateProjectInput = z.infer<typeof projectPartialSchema>;
export type ProjectDocument = CreateProjectInput & Document;
