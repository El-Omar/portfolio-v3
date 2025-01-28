import { blogSchema } from "@portfolio-v3/shared";
import { Document } from "mongoose";
import { z } from "zod";

export const createBlogSchema = z.object({
  body: blogSchema,
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

const blogPartialSchema = blogSchema.partial();

export const updateBlogSchema = z.object({
  body: blogPartialSchema,
  query: z.object({}).optional(),
  params: z.object({
    slug: z.string(),
  }),
});

export type CreateBlogInput = z.infer<typeof blogSchema>;
export type UpdateBlogInput = z.infer<typeof blogPartialSchema>;
export type BlogDocument = CreateBlogInput & Document;
