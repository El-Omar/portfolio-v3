import { Document } from "mongoose";
import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  technologies: z.array(z.string()).min(1),
  imageUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  slug: z.string().optional(),
  order: z.number().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectDocument = CreateProjectInput & Document;
