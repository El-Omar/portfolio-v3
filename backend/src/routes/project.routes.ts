import { Router } from "express";
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import { validateRequest } from "../middleware/validate.middleware";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);

// Private routes
router.use(authMiddleware);
router.post("/", validateRequest(createProjectSchema), createProject);
router.patch("/:slug", validateRequest(updateProjectSchema), updateProject);
router.delete("/:slug", deleteProject);

export default router;
