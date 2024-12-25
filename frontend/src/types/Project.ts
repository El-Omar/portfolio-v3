export type Project = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
};

export type ProjectCreate = Omit<
  Project,
  "_id" | "slug" | "createdAt" | "updatedAt"
>;
export type ProjectUpdate = Partial<ProjectCreate>;

export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

export type ProjectsResponse = ApiResponse<Project[]>;
export type ProjectResponse = ApiResponse<Project>;
