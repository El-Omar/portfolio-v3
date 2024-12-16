export interface BaseProject {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  featured: boolean;
  startDate: Date;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  endDate?: Date;
  order?: number;
}
