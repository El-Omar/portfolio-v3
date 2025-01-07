import { RequestHandler } from "express";
import { S3Service } from "../services/s3.service";
import { ApiResponse, FileUploadResponse } from "@portfolio-v3/shared";

export const getPresignedUrl: RequestHandler<
  {},
  ApiResponse<FileUploadResponse>
> = async (req, res, next) => {
  try {
    const { fileName, fileType, fileSize } = req.body;
    const s3Service = S3Service.getInstance();

    const { uploadUrl, fileKey } = await s3Service.generatePresignedUrl(
      fileName,
      fileType,
      fileSize
    );

    res.json({
      status: "success",
      data: {
        fileKey,
        uploadUrl,
        publicUrl: s3Service.getPublicUrl(fileKey),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFile: RequestHandler<{ fileKey: string }, ApiResponse> = async (
  req,
  res,
  next
) => {
  try {
    const { fileKey } = req.params;
    const s3Service = S3Service.getInstance();

    await s3Service.deleteFile(fileKey);

    res.json({
      status: "success",
      message: "File deleted successfully from AWS bucket",
      data: {
        fileKey,
      },
    });
  } catch (error) {
    next(error);
  }
};
