import mongoose, { Schema } from "mongoose";
import { ProjectDocument } from "../schemas/project.schema";
import { slugify } from "../util/slug";
import sanitizeHtml from "sanitize-html";
import { S3Service } from "../services/s3.service";

const imageMetadataSchema = new Schema({
  url: { type: String, required: true },
  caption: String,
  className: String,
  published: { type: Boolean, default: true },
});

const ProjectSchema: Schema = new Schema<ProjectDocument>(
  {
    slug: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
    content: { type: String },
    technologies: { type: [String], required: true },
    imageUrl: { type: String },
    additionalImages: [imageMetadataSchema],
    videoUrl: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    startDate: { type: String, required: true },
    endDate: { type: String },
    order: { type: Number },
    published: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

ProjectSchema.pre<ProjectDocument>("save", function (next) {
  if (this.isModified("content") && this.content) {
    this.content = sanitizeHtml(this.content, {
      allowedTags: [ 
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
        'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
        'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img'
      ],
      allowedAttributes: {
        'a': [ 'href', 'target', 'rel' ],
        'img': [ 'src', 'alt', 'title' ],
        '*': ['class']
      },
      allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ]
    });
  }
  
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  
  next();
});

// Clean up S3 images when project is deleted
ProjectSchema.pre<ProjectDocument>("deleteOne", async function (next) {
  try {
    const s3Service = S3Service.getInstance();

    if (this.imageUrl) {
      const mainImageKey = s3Service.getFileKey(this.imageUrl);
      await s3Service.deleteFile(mainImageKey);
    }
    
    // Delete all additional images
    if (this.additionalImages?.length) {
      const imageKeys = this.additionalImages.map(img => 
        s3Service.getFileKey(img.url)
      );
      await Promise.all(imageKeys.map(key => s3Service.deleteFile(key)));
    }
  } catch (error) {
    console.error('Error deleting S3 images:', error);
  }

  next();
});

export const Project = mongoose.model<ProjectDocument>("Project", ProjectSchema);
