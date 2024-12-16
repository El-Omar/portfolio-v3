export const mongodb_duplicateKeyError = (error: unknown) =>
  error && typeof error === 'object' && 'code' in error && error.code === 11000;