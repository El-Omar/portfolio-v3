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

// Pagination types
export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginationResponse = {
  total: number;
  pages: number;
  currentPage: number;
  perPage: number;
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