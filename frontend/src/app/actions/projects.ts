"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  ApiResponse,
  ProjectResponse,
  Project,
  projectSchema,
  validateImageFile,
} from "@portfolio-v3/shared";
import { GetProjectsOptions, projectsClient } from "@/lib/api/projects-client";
import { uploadClient } from "@/lib/api/upload-client";

type ValidateAndUploadImageResult =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: string;
    };

export const validateAndUploadImage = async (
  file: File
): Promise<ValidateAndUploadImageResult> => {
  try {
    // Use shared validation function
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error || "Invalid file",
      };
    }

    // Upload file only if validation passes
    const imageUrl = await uploadClient.uploadFile(file);
    return { success: true, data: imageUrl };
  } catch (error) {
    console.error("Image upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
}

export const getProjects = async (options: GetProjectsOptions = {}): Promise<ApiResponse<ProjectResponse[]>> => {
  try {
    return await projectsClient.getAll(options);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to load projects");
  }
}

export const getProjectBySlug = async (
  slug: string
): Promise<ApiResponse<ProjectResponse>> => {
  try {
    return await projectsClient.getBySlug(slug);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to load project");
  }
}

type TransformedProjectData = {
  data: Project;
  imageFile?: File;
};

export const transformAndValidateProject = async (
  formData: FormData
): Promise<ApiResponse<TransformedProjectData>> => {
  try {
    // 1. Convert FormData to object
    const rawData = Object.fromEntries(formData.entries());
    const imageFile = formData.get("imageUrl") as File;

    // 2. Transform data for validation
    const projectData = {
      title: String(rawData.title).trim(),
      description: String(rawData.description).trim(),
      technologies: String(rawData.technologies)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      startDate: rawData.startDate
        ? new Date(String(rawData.startDate)).toISOString()
        : "",
      endDate: rawData.endDate
        ? new Date(String(rawData.endDate)).toISOString()
        : undefined,
      featured: Boolean(rawData.featured),
      order: Number(rawData.order) || 0,
      ...(!!rawData.githubUrl ? { githubUrl: String(rawData.githubUrl) } : {}),
      ...(!!rawData.liveUrl ? { liveUrl: String(rawData.liveUrl) } : {}),
    };

    // 3. Validate with Zod
    const result = projectSchema.safeParse(projectData);
    if (!result.success) {
      return {
        status: "error",
        message: "Validation failed",
        errors: [JSON.stringify(result.error.flatten().fieldErrors)],
      };
    }

    return {
      status: "success",
      data: {
        data: result.data,
        imageFile: imageFile instanceof File ? imageFile : undefined,
      },
    };
  } catch (error) {
    console.error("Data transformation error:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to process data",
    };
  }
}

export const createProject = async (
  _prevState: ApiResponse<ProjectResponse> | Project,
  formData: FormData
): Promise<ApiResponse<ProjectResponse>> => {
  let uploadedImageUrl: string | undefined;

  try {
    // 1. Transform and validate data
    const validationResult = await transformAndValidateProject(formData);
    if (validationResult.status === "error") {
      return validationResult;
    }

    const { data: projectData, imageFile } = validationResult.data;

    // 2. Handle image upload if present
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

    // 3. Create project
    const response = await projectsClient.create(projectData);
    if (response.status === "error" && uploadedImageUrl) {
      await uploadClient.deleteFile(uploadedImageUrl);
      return response;
    }

    return response;
  } catch (error) {
    if (uploadedImageUrl) {
      try {
        await uploadClient.deleteFile(uploadedImageUrl);
      } catch (deleteError) {
        console.error("Failed to delete uploaded image:", deleteError);
      }
    }

    console.error("Project creation error:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create project",
    };
  }
}

export const updateProject = async (
  slug: string,
  formData: FormData,
  etag: string
): Promise<ApiResponse<ProjectResponse>> => {
  let uploadedImageUrl: string | undefined;
  try {
    // 1. Transform and validate data
    const validationResult = await transformAndValidateProject(formData);
    if (validationResult.status === "error") {
      return validationResult;
    }

    const { data: projectData, imageFile } = validationResult.data;

    // 2. Handle image upload if present
    if (imageFile) {
      const uploadResult = await validateAndUploadImage(imageFile);
      if (!uploadResult.success) {
        return {
          status: "error",
          message: uploadResult.error!,
        };
      }
      uploadedImageUrl = uploadResult.data!;
      projectData.imageUrl = uploadedImageUrl;
    }

    // 3. Update project
    const response = await projectsClient.update(slug, projectData, etag);
    if (response.status === "error" && uploadedImageUrl) {
      await uploadClient.deleteFile(uploadedImageUrl);
      return response;
    }

    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return response;
  } catch (error) {
    if (uploadedImageUrl) {
      try {
        await uploadClient.deleteFile(uploadedImageUrl);
      } catch (deleteError) {
        console.error("Failed to delete uploaded image:", deleteError);
      }
    }

    console.error("Project update error:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update project",
    };
  }
}

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
}
