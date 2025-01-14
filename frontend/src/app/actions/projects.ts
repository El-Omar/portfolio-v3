"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  ApiResponse,
  ProjectResponse,
  Project,
  validateImageFile,
  ProjectImage,
} from "@portfolio-v3/shared";
import { GetProjectsOptions, projectsClient } from "@/lib/api/projects-client";
import { uploadClient } from "@/lib/api/upload-client";
import { ValidateAndUploadImageResult } from "@/types/Project";
import { transformAndValidateBasicProjectData, transformProjectImageData } from "@/lib/utils/projects";


export const validateAndUploadImage = async (
  file: File
): Promise<ValidateAndUploadImageResult> => {
  try {
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error || "Invalid file",
      };
    }

    const imageUrl = await uploadClient.uploadFile(file);
    return { success: true, data: imageUrl };
  } catch (error) {
    console.error("Image upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
};

export const getProjects = async (
  options: GetProjectsOptions = {}
): Promise<ApiResponse<ProjectResponse[]>> => {
  try {
    return await projectsClient.getAll(options);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to load projects");
  }
};

export const getProjectBySlug = async (
  slug: string
): Promise<ApiResponse<ProjectResponse>> => {
  try {
    return await projectsClient.getBySlug(slug);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to load project");
  }
};

export const createProject = async (
  _prevState: ApiResponse<ProjectResponse> | Project | null,
  formData: FormData
): Promise<ApiResponse<ProjectResponse>> => {
  let uploadedImageUrl: string | undefined;
  const uploadedAdditionalImages: ProjectImage[] = [];

  try {
    // 1. Transform and validate the basic project data, 
    // we will transform and validate the images in the next step
    const validationResult =
      await transformAndValidateBasicProjectData(formData);
    if (validationResult.status === "error") {
      return validationResult;
    }

    const { data: projectData } = validationResult.data;
    const { imageFile, additionalImages } = transformProjectImageData(formData);

    // 2. Handle main image upload if present
    if (imageFile) {
      const uploadResult = await validateAndUploadImage(imageFile);
      if (!uploadResult.success) {
        return {
          status: "error",
          message: uploadResult.error,
        };
      }
      uploadedImageUrl = uploadResult.data;
      projectData.imageUrl = uploadedImageUrl;
    }

    // 3. Handle additional images upload
    if (additionalImages?.length) {
      for (const image of additionalImages) {
        const uploadResult = await validateAndUploadImage(image.file);
        if (!uploadResult.success) {
          // Clean up any images we've already uploaded
          await Promise.all(
            uploadedAdditionalImages.map((img) =>
              uploadClient.deleteFile(img.url)
            )
          );
          if (uploadedImageUrl) {
            await uploadClient.deleteFile(uploadedImageUrl);
          }
          return {
            status: "error",
            message: uploadResult.error,
          };
        }
        uploadedAdditionalImages.push({
          url: uploadResult.data,
          caption: image.caption,
          className: image.className,
        });
      }
      projectData.additionalImages = uploadedAdditionalImages;
    }

    // 4. Create project
    const response = await projectsClient.create(projectData);
    if (response.status === "error") {
      // Clean up uploaded images if project creation fails
      if (uploadedImageUrl) {
        await uploadClient.deleteFile(uploadedImageUrl);
      }
      await Promise.all(
        uploadedAdditionalImages.map((img) => uploadClient.deleteFile(img.url))
      );
      return response;
    }

    return response;
  } catch (error) {
    // Clean up in case of error
    if (uploadedImageUrl) {
      try {
        await uploadClient.deleteFile(uploadedImageUrl);
      } catch (deleteError) {
        console.error("Failed to delete uploaded main image:", deleteError);
      }
    }
    if (uploadedAdditionalImages.length) {
      try {
        await Promise.all(
          uploadedAdditionalImages.map((img) =>
            uploadClient.deleteFile(img.url)
          )
        );
      } catch (deleteError) {
        console.error(
          "Failed to delete uploaded additional images:",
          deleteError
        );
      }
    }

    console.error("Project creation error:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create project",
    };
  }
};

export const updateProject = async (
  slug: string,
  formData: FormData,
  etag: string
): Promise<ApiResponse<ProjectResponse>> => {
  let uploadedImageUrl: string | undefined;
  const uploadedAdditionalImages: ProjectImage[] = [];

  try {
    // 1. Transform and validate the basic project data
    const validationResult = await transformAndValidateBasicProjectData(formData);
    if (validationResult.status === "error") {
      return validationResult;
    }

    const { data: projectData } = validationResult.data;
    const { imageFile, additionalImages } = transformProjectImageData(formData);

    // 2. Handle main image upload if present
    if (imageFile) {
      const uploadResult = await validateAndUploadImage(imageFile);
      if (!uploadResult.success) {
        return {
          status: "error",
          message: uploadResult.error,
        };
      }
      uploadedImageUrl = uploadResult.data;
      projectData.imageUrl = uploadedImageUrl;
    }

    // 3. Handle additional images upload
    if (additionalImages?.length) {
      for (const image of additionalImages) {
        const uploadResult = await validateAndUploadImage(image.file);
        if (!uploadResult.success) {
          // Clean up any images we've already uploaded
          await Promise.all(
            uploadedAdditionalImages.map((img) => uploadClient.deleteFile(img.url))
          );
          if (uploadedImageUrl) {
            await uploadClient.deleteFile(uploadedImageUrl);
          }
          return {
            status: "error",
            message: uploadResult.error,
          };
        }
        uploadedAdditionalImages.push({
          url: uploadResult.data,
          caption: image.caption,
          className: image.className,
        });
      }
      projectData.additionalImages = uploadedAdditionalImages;
    }

    // 4. Update project
    const response = await projectsClient.update(slug, projectData, etag);
    if (response.status === "error") {
      // Clean up uploaded images if project update fails
      if (uploadedImageUrl) {
        await uploadClient.deleteFile(uploadedImageUrl);
      }
      await Promise.all(
        uploadedAdditionalImages.map((img) => uploadClient.deleteFile(img.url))
      );
      return response;
    }

    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return response;
  } catch (error) {
    // Clean up in case of error
    if (uploadedImageUrl) {
      try {
        await uploadClient.deleteFile(uploadedImageUrl);
      } catch (deleteError) {
        console.error("Failed to delete uploaded main image:", deleteError);
      }
    }
    if (uploadedAdditionalImages.length) {
      try {
        await Promise.all(
          uploadedAdditionalImages.map((img) => uploadClient.deleteFile(img.url))
        );
      } catch (deleteError) {
        console.error("Failed to delete uploaded additional images:", deleteError);
      }
    }

    console.error("Project update error:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update project",
    };
  }
};

export const deleteProject = async (
  slug: string,
  etag: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await projectsClient.delete(slug, etag);

    // Revalidate the specific tag
    revalidateTag("projects");

    // Also revalidate paths that might show projects
    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");

    return response;
  } catch (error) {
    console.error("Error:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to delete project",
    };
  }
};
