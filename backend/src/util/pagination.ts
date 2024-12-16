export const getPaginationParams = ({
  page = 1,
  limit = 10,
  defaultLimit = 10,
  maxLimit = 100,
}: PaginationOptions): PaginationResult => {
  const parsedPage = Math.max(1, Number(page));
  const parsedLimit = Math.min(
    maxLimit,
    Math.max(1, Number(limit) || defaultLimit)
  );

  return {
    limit: parsedLimit,
    offset: (parsedPage - 1) * parsedLimit,
    page: parsedPage,
  };
};

export const createPaginationResponse = (
  total: number,
  { page, limit }: PaginationResult
) => ({
  total,
  pages: Math.ceil(total / limit),
  currentPage: page,
  perPage: limit,
});
