import { Router } from "express";
import { getPresignedUrl, deleteFile } from "../controllers/upload.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { deleteFileSchema, presignedUrlSchema } from "../schemas/login.schema";

const router = Router();

router.use(authMiddleware);

router.post(
  "/presigned-url",
  validateRequest(presignedUrlSchema),
  getPresignedUrl
);

router.delete("/:fileKey", validateRequest(deleteFileSchema), deleteFile);

export default router;
