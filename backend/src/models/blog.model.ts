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
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true },

    author: { type: String, required: true },
    categories: { type: [String], required: true },
    tags: { type: [String], default: [] },
    readingTime: { type: Number },

    coverImage: { type: imageMetadataSchema },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    featured: { type: Boolean, default: false },
    order: { type: Number },

    writtenAt: { type: String, required: true },

    seoTitle: String,
    seoDescription: String,
    canonicalUrl: String,

    substackUrl: String,
    substackId: String,
    lastSyncedAt: Date,
    syncStatus: {
      type: String,
      enum: ["pending", "synced", "failed", "not_synced"],
      default: "not_synced",
    },

    viewCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BlogSchema.index({
  title: "text",
  description: "text",
  content: "text",
  categories: "text",
  tags: "text",
});

function calculateReadingTime(content: string): number {
  const WORDS_PER_MINUTE = 225;
  const IMAGE_SECONDS = 12;
  const CODE_BLOCK_MULTIPLIER = 1.5;

  const cleanContent = content
    .replace(/<pre[\s\S]*?<\/pre>/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const imageCount = (content.match(/<img[^>]*>/g) || []).length;
  const codeBlockCount = (content.match(/<pre[\s\S]*?<\/pre>/g) || []).length;
  const words = cleanContent.split(/\s+/).filter((word) => word.length > 0);

  const wordsTime = words.length / WORDS_PER_MINUTE;
  const imageTime = (imageCount * IMAGE_SECONDS) / 60;
  const codeTime = codeBlockCount * CODE_BLOCK_MULTIPLIER;

  const totalMinutes = wordsTime + imageTime + codeTime;
  return Math.max(1, Math.round(totalMinutes));
}

BlogSchema.pre<BlogDocument>("save", function (next) {
  // Sanitize content if modified
  if (this.isModified("content")) {
    this.content = sanitizeHtml(this.content, {
      allowedTags: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "p",
        "a",
        "ul",
        "ol",
        "nl",
        "li",
        "b",
        "i",
        "strong",
        "em",
        "strike",
        "code",
        "hr",
        "br",
        "div",
        "table",
        "thead",
        "caption",
        "tbody",
        "tr",
        "th",
        "td",
        "pre",
        "img",
        "iframe",
      ],
      allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt", "title"],
        iframe: ["src", "title", "allowfullscreen", "width", "height"],
        "*": ["class"],
      },
      allowedSchemes: ["http", "https", "ftp", "mailto"],
    });

    this.readingTime = calculateReadingTime(this.content);
  }

  if (this.isModified("title")) {
    this.slug = slugify(this.title);
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
    console.error("Error deleting S3 images:", error);
  }

  next();
});

export const Blog = mongoose.model<BlogDocument>("Blog", BlogSchema);
