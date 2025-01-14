import { z } from "zod";

const imageMetadataSchema = z.object({
  url: z.string().url(),
  caption: z.string().optional(),
  className: z.string().optional(), 
  order: z.number().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  content: z.string().optional(),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  imageUrl: z.string().url().optional(),
  additionalImages: z.array(imageMetadataSchema).optional(),
  videoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  order: z.number().optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectImage = z.infer<typeof imageMetadataSchema>;