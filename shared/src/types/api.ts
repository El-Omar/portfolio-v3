export type ApiResponse<T = unknown> = {
  status?: "success" | "error";
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationResponse;
};

export type LoginDataResult = {
  token: string;
  user: {
    email: string;
  };
  /** Absolute number in millisecond for the token expiration */
  maxAge: number;
};

// == PAGINATION ==
export type PaginationOptions = {
  page?: number | string;
  limit?: number | string;
  defaultLimit?: number;
  maxLimit?: number;
};

export type PaginationResult = {
  limit: number;
  offset: number;
  page: number;
};

export type PaginationResponse = {
  total: number;
  pages: number;
  currentPage: number;
  perPage: number;
}