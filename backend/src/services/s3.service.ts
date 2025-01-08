import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../config/aws";
import { env } from "../config/env";
import { BadRequestError } from "../util/errors";
import {
  ALLOWED_IMAGE_TYPES,
  IMAGE_MAX_SIZE,
  toBytes,
} from "@portfolio-v3/shared";
export class S3Service {
  private static readonly instance: S3Service = new S3Service();
  private readonly maxFileSize = toBytes({ MB: IMAGE_MAX_SIZE });
  private readonly allowedMimeTypes = ALLOWED_IMAGE_TYPES;

  private constructor() {}

  static getInstance(): S3Service {
    return this.instance;
  }

  private generateKey(fileName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = fileName.split(".").pop();
    return `uploads/media/${timestamp}-${randomString}.${extension}`;
  }

  async generatePresignedUrl(
    fileName: string,
    fileType: string,
    fileSize: number
  ): Promise<{ uploadUrl: string; fileKey: string }> {
    // Validate file type
    if (fileSize > this.maxFileSize) {
      throw new BadRequestError(
        `This file is too chunky. That's a big boy! Max allowed is ${this.maxFileSize} in bytes`
      );
    }

    const extension = fileName.split(".").pop();
    if (!extension) {
      throw new BadRequestError("What? No file extension? Tsk, pleb.");
    }

    if (!this.allowedMimeTypes.includes(fileType)) {
      throw new BadRequestError(
        `Invalid file type. Allowed types: ${this.allowedMimeTypes.join(", ")}`
      );
    }

    const fileKey = this.generateKey(fileName);
    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: fileKey,
      ContentType: fileType,
    });

    try {
      const uploadUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });
      return { uploadUrl, fileKey };
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new BadRequestError("Failed to generate upload URL");
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: env.AWS_S3_BUCKET,
        Key: fileKey,
      });

      await s3Client.send(command);
    } catch (error) {
      console.error("Error deleting file from S3:", error);
      throw new BadRequestError("Failed to delete file");
    }
  }

  getPublicUrl(fileKey: string): string {
    return `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${fileKey}`;
  }

  getFileKey(url: string): string {
    const bucketUrl = `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/`;
    return url.replace(bucketUrl, "");
  }
}
