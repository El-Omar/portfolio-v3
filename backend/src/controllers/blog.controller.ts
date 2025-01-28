import { RequestHandler } from "express";
import { Blog } from "../models/blog.model";
import { createPaginationResponse, getPaginationParams } from "../util/pagination";
import { CreateBlogInput, UpdateBlogInput } from "../schemas/blog.schema";
import { generateEtag, compareEtags } from "../util/etag";
import { BadRequestError, NotFoundError } from "../util/errors";
import { ApiResponse, GetBlogsQuery, Blog as BlogType } from "@portfolio-v3/shared";
import { S3Service } from "../services/s3.service";
import { getProjection } from "../util/projection";

type ReceivedBlogQuery = GetBlogsQuery & {
  status?: string;
  featured?: string;
};

// GET blogs endpoint: /blogs
export const getBlogs: RequestHandler<
  {},
  ApiResponse<BlogType[]>,
  {},
  ReceivedBlogQuery
> = async (req, res, next) => {
  try {
    const { 
      featured, 
      fields, 
      status, 
      category,
      tag,
      author,
      search,
      startDate,
      endDate,
      orderBy = "publishedAt",
      orderDirection = "desc"
    } = req.query;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    if (category) {
      query.categories = category;
    }

    if (tag) {
      query.tags = tag;
    }

    if (author) {
      query.author = author;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (startDate || endDate) {
      query.publishedAt = {};
      if (startDate) query.publishedAt.$gte = startDate;
      if (endDate) query.publishedAt.$lte = endDate;
    }

    const projection = getProjection(fields, true);
    const sortOrder = orderDirection === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [orderBy]: sortOrder };

    const pagination = getPaginationParams({
      page: req.query.page,
      limit: req.query.limit,
    });

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .select(projection)
        .sort(sortQuery)
        .limit(pagination.limit)
        .skip(pagination.offset),
      Blog.countDocuments(query),
    ]);

    const blogDocs = blogs.map((blog) => {
      const doc = blog.toObject();
      return {
        ...doc,
        _etag: generateEtag(doc),
      };
    });

    res.json({
      status: "success",
      data: blogDocs,
      pagination: createPaginationResponse(total, pagination.page, pagination.limit),
    });
  } catch (error) {
    next(error);
  }
};

// GET blog by slug endpoint: /blogs/:slug
export const getBlogBySlug: RequestHandler<
  { slug: string },
  ApiResponse<BlogType>
> = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    const etag = generateEtag(blog);
    const ifNoneMatch = req.header("If-None-Match");
    if (ifNoneMatch && compareEtags(ifNoneMatch, etag)) {
      res.status(304).end();
      return;
    }

    const blogWithEtag = {
      ...blog.toObject(),
      _etag: etag,
    };

    res.json({
      status: "success",
      data: blogWithEtag,
    });
  } catch (error) {
    next(error);
  }
};

// POST blogs endpoint: /blogs
export const createBlog: RequestHandler<
  {},
  ApiResponse<BlogType>,
  CreateBlogInput
> = async (req, res, next) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();

    res.status(201).json({
      status: "success",
      data: newBlog,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH blogs endpoint: /blogs/:slug
export const updateBlog: RequestHandler<
  { slug: string },
  ApiResponse<BlogType>,
  UpdateBlogInput
> = async (req, res, next) => {
  try {
    const currentBlog = await Blog.findOne({ slug: req.params.slug });
    if (!currentBlog) {
      throw new NotFoundError("Blog not found");
    }

    const ifMatch = req.header("If-Match");
    if (!ifMatch) {
      throw new BadRequestError("Precondition Required: If-Match header is required", 428);
    }

    const currentEtag = generateEtag(currentBlog);
    if (!compareEtags(ifMatch, currentEtag)) {
      throw new BadRequestError("Precondition Failed: Resource has been modified", 412);
    }

    // Handle cover image deletion if changed
    if (
      req.body.coverImage?.url &&
      currentBlog.coverImage?.url &&
      req.body.coverImage.url !== currentBlog.coverImage.url
    ) {
      try {
        const s3Service = S3Service.getInstance();
        const oldFileKey = s3Service.getFileKey(currentBlog.coverImage.url);
        await s3Service.deleteFile(oldFileKey);
      } catch (error) {
        console.error("Failed to delete old cover image:", error);
      }
    }

    const updatedBlog = await currentBlog
      .set({
        ...currentBlog.toObject(),
        ...req.body,
      })
      .save();

    res.json({
      status: "success",
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE blogs endpoint: /blogs/:slug
export const deleteBlog: RequestHandler<{ slug: string }> = async (
  req,
  res,
  next
) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }

    const ifMatch = req.header("If-Match");
    if (!ifMatch) {
      throw new BadRequestError("Precondition Required: If-Match header is required", 428);
    }

    const currentEtag = generateEtag(blog);
    if (!compareEtags(ifMatch, currentEtag)) {
      throw new BadRequestError("Precondition Failed: Resource has been modified", 412);
    }

    await blog.deleteOne();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
