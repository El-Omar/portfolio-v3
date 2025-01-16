import {
  FileUploadResponse,
  API_ROUTES,
  ApiResponse,
} from "@portfolio-v3/shared";
import { BaseApiClient } from "./base-client";
import { verifyAuth } from "@/lib/auth/verifyAuth";

const { UPLOADS } = API_ROUTES;
export class UploadClient extends BaseApiClient {
  async uploadFile(file: File): Promise<ApiResponse<string>> {
    try {
      const auth = await verifyAuth();
      if (!auth.success) {
        return {
          status: "error",
          message: "Authentication required to upload files",
        };
      }

      // Validate file before upload
      if (!file) {
        return {
          status: "error",
          message: "No file provided",
        };
      }

      if (file.size === 0) {
        return {
          status: "error",
          message: "File is empty",
        };
      }

      // Get presigned URL from server
      let presignedUrlResponse;
      try {
        const response = await this.fetch<FileUploadResponse>(
          UPLOADS.PRESIGNED_URL,
          {
            method: "POST",
            protected: true,
            body: {
              fileName: file.name,
              fileType: file.type,
              fileSize: file.size,
            },
          }
        );

        if (response.status !== "success" || !response.data) {
          return {
            status: "error",
            message: response.message || "Failed to get upload URL",
          };
        }

        presignedUrlResponse = response;
      } catch (error) {
        console.error("Presigned URL error:", error);
        return {
          status: "error",
          message:
            error instanceof Error ? error.message : "Failed to get upload URL",
        };
      }

      const { data } = presignedUrlResponse;

      // Upload file directly to S3 using the presigned URL
      const uploadResponse = await fetch(data.uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        return {
          status: "error",
          message: `Failed to upload file to storage: ${uploadResponse.status} ${uploadResponse.statusText}`,
        };
      }

      return {
        status: "success",
        data: data.publicUrl,
      };
    } catch (error) {
      console.error("File upload failed:", error);

      return {
        status: "error",
        message: `Failed to upload file${error instanceof Error ? `: ${error.message}` : ""}`,
      };
    }
  }

  async deleteFile(fileKey: string): Promise<ApiResponse> {
    try {
      const auth = await verifyAuth();
      if (!auth.success) {
        return {
          status: "error",
          message: "Authentication required to delete files",
        };
      }

      if (!fileKey) {
        return {
          status: "error",
          message: "No file key provided",
        };
      }

      const response = await this.fetch<{ status: string }>(
        UPLOADS.BY_KEY(fileKey),
        {
          method: "DELETE",
          protected: true,
        }
      );

      if (!response.status || response.status !== "success") {
        return {
          status: "error",
          message: response.message || "Failed to delete file",
        };
      }

      return {
        status: "success",
        data: {},
      };
    } catch (error) {
      console.error("File deletion failed:", error);
      return {
        status: "error",
        message: `Failed to delete file${error instanceof Error ? `: ${error.message}` : ""}`,
      };
    }
  }
}

export const uploadClient = new UploadClient();
