"use server";

import {
  ApiResponse,
  Blog,
  BlogResponse,
  validateImageFile,
} from "@portfolio-v3/shared";
import { revalidatePath, revalidateTag } from "next/cache";
import { blogsClient, GetBlogsOptions } from "@/lib/api/blog-client";
import { uploadClient } from "@/lib/api/upload-client";
import {
  transformAndValidateBasicBlogData,
  transformBlogImageData,
} from "@/lib/utils/blogs";
import { ValidateAndUploadImageResult } from "@/types/Project";

export const validateAndUploadImage = async (
  file: File,
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
    if (imageUrl.status !== "success") {
      return {
        success: false,
        error: imageUrl.message || "Failed to upload image",
      };
    }
    return { success: true, data: imageUrl.data };
  } catch (error) {
    console.error("Image upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
};

export const getBlogs = async (
  options: GetBlogsOptions = {},
): Promise<ApiResponse<BlogResponse[]>> => {
  try {
    return await blogsClient.getAll(options);
  } catch (error) {
    console.error("Error:", error);
    return {
      status: "error",
      message: "Failed to load blogs",
    };
  }
};

export const getBlogBySlug = async (
  slug: string,
): Promise<ApiResponse<BlogResponse>> => {
  try {
    return await blogsClient.getBySlug(slug);
  } catch (error) {
    console.error("Error:", error);
    return {
      status: "error",
      message: "Failed to load blog",
    };
  }
};

export const createBlog = async (
  _prevState: ApiResponse<BlogResponse> | Blog | null,
  formData: FormData,
): Promise<ApiResponse<BlogResponse>> => {
  let uploadedCoverImageUrl: string | undefined;

  try {
    const validationResult = await transformAndValidateBasicBlogData(formData);
    if (validationResult.status === "error") {
      return validationResult;
    }

    const { data: blogData } = validationResult.data;
    const { coverImageFile } = transformBlogImageData(formData);

    if (coverImageFile) {
      const uploadResult = await validateAndUploadImage(coverImageFile);
      if (!uploadResult.success) {
        return {
          status: "error",
          message: uploadResult.error,
        };
      }
      uploadedCoverImageUrl = uploadResult.data;
      blogData.coverImage = {
        url: uploadedCoverImageUrl,
        caption: formData.get("coverImageCaption") as string,
        className: formData.get("coverImageClassName") as string,
      };
    }

    const response = await blogsClient.create(blogData);
    if (response.status === "error" && uploadedCoverImageUrl) {
      await uploadClient.deleteFile(uploadedCoverImageUrl);
      return response;
    }

    return response;
  } catch (error) {
    if (uploadedCoverImageUrl) {
      try {
        await uploadClient.deleteFile(uploadedCoverImageUrl);
      } catch (deleteError) {
        console.error("Failed to delete uploaded cover image:", deleteError);
      }
    }

    console.error("Blog creation error:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to create blog",
    };
  }
};

export const updateBlog = async (
  _prevState: ApiResponse<BlogResponse> | Blog | null,
  formData: FormData,
  blogToUpdate: BlogResponse,
): Promise<ApiResponse<BlogResponse>> => {
  let uploadedCoverImageUrl: string | undefined;

  try {
    const validationResult = await transformAndValidateBasicBlogData(formData);
    if (validationResult.status === "error") {
      return validationResult;
    }

    const { data: blogData } = validationResult.data;
    const { coverImageFile } = transformBlogImageData(formData);

    if (coverImageFile) {
      const uploadResult = await validateAndUploadImage(coverImageFile);
      if (!uploadResult.success) {
        return {
          status: "error",
          message: uploadResult.error,
        };
      }
      uploadedCoverImageUrl = uploadResult.data;
      blogData.coverImage = {
        url: uploadedCoverImageUrl,
        caption: formData.get("coverImageCaption") as string,
        className: formData.get("coverImageClassName") as string,
      };
    } else {
      blogData.coverImage = blogToUpdate.coverImage;
    }

    const response = await blogsClient.update(
      blogToUpdate.slug,
      blogToUpdate._etag,
      blogData,
    );

    if (response.status === "error" && uploadedCoverImageUrl) {
      await uploadClient.deleteFile(uploadedCoverImageUrl);
      return response;
    }

    revalidateTag("blogs");
    revalidatePath("/admin/dashboard/blogs");
    revalidatePath("/blog");
    return response;
  } catch (error) {
    if (uploadedCoverImageUrl) {
      try {
        await uploadClient.deleteFile(uploadedCoverImageUrl);
      } catch (deleteError) {
        console.error("Failed to delete uploaded cover image:", deleteError);
      }
    }

    console.error("Blog update error:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to update blog",
    };
  }
};

export const deleteBlog = async (
  slug: string,
  etag: string,
): Promise<ApiResponse<void>> => {
  try {
    const response = await blogsClient.delete(slug, etag);

    revalidateTag("blogs");
    revalidatePath("/admin/dashboard/blogs");
    revalidatePath("/blog");

    return response;
  } catch (error) {
    console.error("Error:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Failed to delete blog",
    };
  }
};
