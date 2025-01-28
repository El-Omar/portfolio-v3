import { ApiResponse, Blog, blogSchema } from "@portfolio-v3/shared";

type TransformedImageBlogData = {
  coverImageFile?: File;
};

export const transformBlogImageData = (
  formData: FormData,
): TransformedImageBlogData => {
  const coverImageFile = formData.get("coverImage") as File;

  return {
    coverImageFile: coverImageFile instanceof File ? coverImageFile : undefined,
  };
};

type TransformedBasicBlogData = {
  data: Blog;
};

export const transformAndValidateBasicBlogData = async (
  formData: FormData,
): Promise<ApiResponse<TransformedBasicBlogData>> => {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const blogData = {
      title: String(rawData.title).trim(),
      description: String(rawData.description).trim(),
      content: String(rawData.content).trim(),
      author: String(rawData.author).trim(),
      categories: String(rawData.categories)
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      tags: rawData.tags
        ? String(rawData.tags)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : undefined,
      status: String(rawData.status) as Blog["status"],
      featured: Boolean(rawData.featured),
      order: Number(rawData.order) || undefined,
      seoTitle: rawData.seoTitle ? String(rawData.seoTitle) : undefined,
      seoDescription: rawData.seoDescription
        ? String(rawData.seoDescription)
        : undefined,
      canonicalUrl: rawData.canonicalUrl
        ? String(rawData.canonicalUrl)
        : undefined,
    };

    const result = blogSchema.safeParse(blogData);
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
};
