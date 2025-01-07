export const API_ROUTES = {
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  PROJECTS: {
    BASE: '/projects',
    BY_SLUG: (slug: string) => `/projects/${slug}`,
  },
  UPLOADS: {
    BASE: '/uploads',
    PRESIGNED_URL: '/uploads/presigned-url',
    BY_KEY: (fileKey: string) => `/uploads/${fileKey}`,
  },
} as const; 