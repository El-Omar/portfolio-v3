import { z } from "zod";

// Reuse the image metadata schema from project
const imageMetadataSchema = z.object({
  url: z.string().url(),
  caption: z.string().optional(),
  className: z.string().optional(),
});

export const blogSchema = z.object({
  // Basic blog post information
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  description: z.string().min(1, "Description is required").max(300, "Description must be less than 300 characters"),
  content: z.string().min(1, "Content is required"), // Markdown/HTML content
  
  // Meta information
  author: z.string().min(1, "Author is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.array(z.string()).optional(),
  readingTime: z.number().int().min(1).default(1), // Added default and validation
  
  // Media
  coverImage: imageMetadataSchema.optional(),
  
  // Publication status and display
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured: z.boolean().default(false),
  order: z.number().optional(), // For custom ordering in lists
  
  // Dates
  writtenAt: z.string().datetime().default(new Date().toISOString()),
  
  // SEO
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  
  // External platform sync fields
  substackUrl: z.string().url().optional(),
  substackId: z.string().optional(),
  lastSyncedAt: z.string().datetime().optional(),
  syncStatus: z.enum(["pending", "synced", "failed", "not_synced"]).optional(),
  
  // Analytics and engagement
  viewCount: z.number().default(0),
  likeCount: z.number().default(0),
  commentCount: z.number().default(0),
});

export type Blog = z.infer<typeof blogSchema>;
export type BlogImage = z.infer<typeof imageMetadataSchema>;
