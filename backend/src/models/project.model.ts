import mongoose, { Schema, Document } from "mongoose";
import { ProjectDocument } from "../schemas/project.schema";

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

// For the slug thingy
ProjectSchema.pre<ProjectDocument>("save", function (next) {
  console.log("Pre save fn, is title modified?", this.isModified("title"));
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
  next();
});

export const Project = mongoose.model<ProjectDocument>("Project", ProjectSchema);
