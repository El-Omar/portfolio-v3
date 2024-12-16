interface PaginationOptions {
  page?: number | string;
  limit?: number | string;
  defaultLimit?: number;
  maxLimit?: number;
}

interface PaginationResult {
  limit: number;
  offset: number;
  page: number;
}
