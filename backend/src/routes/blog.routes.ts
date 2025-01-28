import { Router } from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";
import { validateRequest } from "../middleware/validate.middleware";
import {
  createBlogSchema,
  updateBlogSchema,
} from "../schemas/blog.schema";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// Private routes
router.use(authMiddleware);
router.post("/", validateRequest(createBlogSchema), createBlog);
router.patch("/:slug", validateRequest(updateBlogSchema), updateBlog);
router.delete("/:slug", deleteBlog);

export default router;
