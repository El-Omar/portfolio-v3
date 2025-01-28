import mongoose, { Schema } from "mongoose";
import { BlogDocument } from "../schemas/blog.schema";
import { slugify } from "../util/slug";
import sanitizeHtml from "sanitize-html";
import { S3Service } from "../services/s3.service";

const imageMetadataSchema = new Schema({
  url: { type: String, required: true },
  caption: String,
  className: String,
});

const BlogSchema: Schema = new Schema<BlogDocument>(
  {
    // Basic blog post information
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true }, // Stores sanitized HTML/Markdown
    
    // Meta information
    author: { type: String, required: true },
    categories: { type: [String], required: true },
    tags: { type: [String], default: [] },
    readingTime: { type: Number },
    
    // Media
    coverImage: { type: imageMetadataSchema },
    
    // Publication status and display
    status: { 
      type: String, 
      enum: ["draft", "published", "archived"],
      default: "draft"
    },
    featured: { type: Boolean, default: false },
    order: { type: Number },
    
    // Dates
    publishedAt: { type: Date },
    
    // SEO
    seoTitle: String,
    seoDescription: String,
    canonicalUrl: String,
    
    // External platform sync
    substackUrl: String,
    substackId: String,
    lastSyncedAt: Date,
    syncStatus: {
      type: String,
      enum: ["pending", "synced", "failed", "not_synced"],
      default: "not_synced"
    },
    
    // Analytics and engagement
    viewCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  { 
    timestamps: true, 
    versionKey: false 
  }
);

// Create text index for search functionality
BlogSchema.index({ 
  title: 'text', 
  description: 'text', 
  content: 'text',
  categories: 'text',
  tags: 'text' 
});

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .split(/\s+/)
    .filter(word => word.length > 0).length;
  
  return Math.ceil(wordCount / wordsPerMinute);
}

// Sanitize HTML content and generate slug before saving
BlogSchema.pre<BlogDocument>("save", function (next) {
  // Sanitize content if modified
  if (this.isModified("content")) {
    this.content = sanitizeHtml(this.content, {
      allowedTags: [ 
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
        'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
        'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img',
        'iframe' // Allow iframe for embedded content
      ],
      allowedAttributes: {
        'a': [ 'href', 'target', 'rel' ],
        'img': [ 'src', 'alt', 'title' ],
        'iframe': ['src', 'title', 'allowfullscreen', 'width', 'height'],
        '*': ['class']
      },
      allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ]
    });
  }
  
  // Calculate reading time if content is modified
  if (this.isModified("content")) {
    this.readingTime = calculateReadingTime(this.content);
  }
  
  // Generate slug from title if title is modified
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  
  // Set publishedAt when status changes to published
  if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date().toISOString();
  }
  
  next();
});

// Clean up S3 images when blog is deleted
BlogSchema.pre<BlogDocument>("deleteOne", async function (next) {
  try {
    const s3Service = S3Service.getInstance();

    if (this.coverImage?.url) {
      const imageKey = s3Service.getFileKey(this.coverImage.url);
      await s3Service.deleteFile(imageKey);
    }
  } catch (error) {
    console.error('Error deleting S3 images:', error);
  }

  next();
});

// Add virtual field for formatted dates
BlogSchema.virtual('formattedPublishedDate').get(function(this: BlogDocument) {
  return this.publishedAt ? new Date(this.publishedAt).toLocaleDateString() : null;
});

export const Blog = mongoose.model<BlogDocument>("Blog", BlogSchema);
