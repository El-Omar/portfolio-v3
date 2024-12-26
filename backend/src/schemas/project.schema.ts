import { projectSchema } from "@portfolio-v3/shared";
import { Document } from "mongoose";
import { z } from "zod";

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
