import { Project } from "../schemas/project";
import { Blog } from "../schemas/blog";
import { WithEtag, WithEveFields, WithSlug } from "./helpers";

// Base API Response Types
export type ApiErrorResponse = {
  status: "error";
  message: string;
  errors?: string[];
};

export type ApiSuccessResponse<T> = {
  status: "success";
  data: T;
  message?: string;
  pagination?: PaginationResponse;
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// Pagination Types
export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginationResponse = {
  total: number;
  currentPage: number;
  perPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

// Auth Types
export type LoginResponse = {
  token: string;
  user: {
    email: string;
  };
  maxAge: number;
};

// File Upload Types
export type FileUploadResponse = {
  fileKey: string;
  uploadUrl: string;
  publicUrl: string;
};

// Project Types
export type ProjectResponse = WithEveFields<WithSlug<WithEtag<Project>>>;

export type GetProjectsQuery = PaginationParams & {
  featured?: boolean;
  fields?: string;
  include?: boolean;
  published?: boolean;
  sort?: "order" | "createdAt" | "startDate";
  asc?: boolean;
};

// Blog Types
export type BlogResponse = WithEveFields<WithSlug<WithEtag<Blog>>>;

export type GetBlogsQuery = PaginationParams & {
  featured?: boolean;
  fields?: string;
  status?: "draft" | "published" | "archived";
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  orderBy?: "publishedAt" | "createdAt" | "order" | "viewCount";
  orderDirection?: "asc" | "desc";
};

export type BlogSyncResponse = {
  substackUrl?: string;
  substackId?: string;
  syncStatus: "pending" | "synced" | "failed" | "not_synced";
  lastSyncedAt?: string;
  message?: string;
};
