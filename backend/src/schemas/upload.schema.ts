import { z } from "zod";
import { IMAGE_MAX_SIZE, toBytes } from "@portfolio-v3/shared";

export const presignedUrlSchema = z.object({
  body: z.object({
    fileName: z.string().min(1, "File name is required"),
    fileType: z.string().min(1, "File type is required"),
    fileSize: z
      .number()
      .positive("File size must be positive")
      .max(
        toBytes({ MB: IMAGE_MAX_SIZE }),
        `File size must not exceed ${IMAGE_MAX_SIZE}MB`
      ),
  }),
});

export const deleteFileSchema = z.object({
  params: z.object({
    fileKey: z.string().min(1, "File key is required"),
  }),
});