import { Project } from "../schemas/project";
import { WithEtag, WithEveFields, WithSlug } from "./helpers";

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

// Consolidated pagination types
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

// Common response types
export type FileUploadResponse = {
  fileKey: string;
  uploadUrl: string;
  publicUrl: string;
};

export type LoginResponse = {
  token: string;
  user: {
    email: string;
  };
  maxAge: number;
};

export type ProjectResponse = WithEveFields<WithSlug<WithEtag<Project>>>;
