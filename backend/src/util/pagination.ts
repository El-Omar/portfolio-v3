import { PaginationParams, PaginationResponse } from "@portfolio-v3/shared";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export const getPaginationParams = ({
  page = 1,
  limit = DEFAULT_LIMIT,
}: PaginationParams = {}) => {
  const parsedPage = Math.max(1, Number(page));
  const parsedLimit = Math.min(MAX_LIMIT, Math.max(1, Number(limit)));

  return {
    limit: parsedLimit,
    offset: (parsedPage - 1) * parsedLimit,
    page: parsedPage,
  };
};

export const createPaginationResponse = (
  total: number,
  page: number,
  limit: number = DEFAULT_LIMIT
): PaginationResponse => ({
  total,
  currentPage: page,
  perPage: limit,
  hasNextPage: page * limit < total,
  hasPreviousPage: page > 1,
});
