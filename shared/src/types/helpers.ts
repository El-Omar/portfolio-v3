export type WithEveFields<T> = T & {
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export type WithSlug<T> = T & {
  slug: string;
};
