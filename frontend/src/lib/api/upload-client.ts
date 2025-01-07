import { ApiResponse, FileUploadResponse, API_ROUTES } from "@portfolio-v3/shared";
import { BaseApiClient } from "./base-client";
import { verifyAuth } from "@/lib/auth/verifyAuth";

const { UPLOADS } = API_ROUTES;
export class UploadClient extends BaseApiClient {
  async uploadFile(file: File): Promise<string> {
    try {
      const auth = await verifyAuth();
      if (!auth.success) {
        throw new Error("Authentication required to upload files");
      }

      // Validate file before upload
      if (!file) {
        throw new Error("No file provided");
      }

      if (file.size === 0) {
        throw new Error("File is empty");
      }

      // Get presigned URL from server
      let presignedUrlResponse;
      try {
        const response = await this.fetch<ApiResponse<FileUploadResponse>>(UPLOADS.PRESIGNED_URL, {
          method: "POST",
          protected: true,
          body: {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          },
        });

        console.log(response);
        
        if (response.status !== 'success' || !response.data) {
          throw new Error(response.message || 'Failed to get upload URL');
        }
        
        presignedUrlResponse = response;
      } catch (error) {
        console.error('Presigned URL error:', error);
        throw error;
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
        throw new Error(
          `Failed to upload file to storage: ${uploadResponse.status} ${uploadResponse.statusText}`
        );
      }

      return data.publicUrl;
    } catch (error) {
      // Log error for debugging
      console.error("File upload failed:", error);

      // Rethrow with user-friendly message
      throw new Error(
        `Failed to upload file${error instanceof Error ? `: ${error.message}` : ''}`
      );
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    try {
      const auth = await verifyAuth();
      if (!auth.success) {
        throw new Error("Authentication required to delete files");
      }

      if (!fileKey) {
        throw new Error("No file key provided");
      }

      const response = await this.fetch<{ status: string }>(UPLOADS.BY_KEY(fileKey), {
        method: "DELETE",
        protected: true,
      });

      if (!response.status || response.status !== "success") {
        throw new Error("Failed to delete file");
      }
    } catch (error) {
      console.error("File deletion failed:", error);
      throw new Error(
        `Failed to delete file${error instanceof Error ? `: ${error.message}` : ''}`
      );
    }
  }
}

export const uploadClient = new UploadClient(); 