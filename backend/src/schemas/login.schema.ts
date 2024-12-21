import { z } from "zod";
import { env } from "../config/env";
import { toBytes } from "../util/files";

export const presignedUrlSchema = z.object({
  body: z.object({
    fileName: z.string().min(1, "File name is required"),
    fileType: z.string().min(1, "File type is required"),
    fileSize: z
      .number()
      .positive("File size must be positive")
      .max(
        toBytes({ MB: env.AWS_MAX_FILE_SIZE }),
        `File size must not exceed ${env.AWS_MAX_FILE_SIZE}MB`
      ),
  }),
});

export const deleteFileSchema = z.object({
  params: z.object({
    fileKey: z.string().min(1, "File key is required"),
  }),
});