import { z } from "zod";

const imageMetadataSchema = z.object({
  url: z.string().url(),
  caption: z.string().optional().nullable(),
  className: z.string().optional().nullable(),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  content: z.string().optional().nullable(),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  imageUrl: z.string().url().optional().nullable(),
  additionalImages: z.array(imageMetadataSchema).optional(),
  videoUrl: z.string().url().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  liveUrl: z.string().url().optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional().nullable(),
  order: z.number().optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectImage = z.infer<typeof imageMetadataSchema>;