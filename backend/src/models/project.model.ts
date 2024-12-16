import mongoose, { Schema, Document } from "mongoose";
import { BaseProject } from "../types/project.types";

export interface IProject extends BaseProject, Document {}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    imageUrl: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    slug: { type: String, required: true, unique: true },
    order: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

// For the slug thingy
ProjectSchema.pre<IProject>("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
  next();
});

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
