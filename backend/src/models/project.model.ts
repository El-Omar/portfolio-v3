import mongoose, { Schema } from "mongoose";
import { ProjectDocument } from "../schemas/project.schema";
import { slugify } from "../util/slug";

const ProjectSchema: Schema = new Schema<ProjectDocument>(
  {
    slug: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    imageUrl: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    startDate: { type: String, required: true },
    endDate: { type: String },
    order: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

ProjectSchema.pre<ProjectDocument>("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});

export const Project = mongoose.model<ProjectDocument>(
  "Project",
  ProjectSchema
);
