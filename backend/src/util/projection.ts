type Projection = Record<string, number>;

export const getProjection = (fields?: string, include: boolean = true): Projection => {
  if (!fields) {
    return {};
  }

  const defaultProjection: Projection = include ? {} : { _id: 1 };

  return fields.split(',').reduce<Projection>((acc, field) => ({
    ...acc,
    [field.trim()]: include ? 1 : 0
  }), defaultProjection);
};
