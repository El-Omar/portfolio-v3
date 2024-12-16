import { Router } from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import { etagMiddleware } from '../middleware/etag.middleware';
import { validateRequest } from '../middleware/validate.middleware';
import {
  createProjectSchema,
  updateProjectSchema,
} from '../schemas/project.schema';

const router = Router();
router.use(etagMiddleware);

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', validateRequest(createProjectSchema), createProject);
router.patch('/:slug', validateRequest(updateProjectSchema), updateProject);
router.delete('/:slug', deleteProject);

export default router;
