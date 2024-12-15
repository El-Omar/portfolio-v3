import { Router } from "express";
import { getProjects, getProjectBySlug } from "../controllers/project.controller";

const router = Router();

router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);


export default router;