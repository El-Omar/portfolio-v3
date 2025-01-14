import { AdditionalImage } from "@/types/Project";
import { ApiResponse, Project, projectSchema } from "@portfolio-v3/shared";

type TransformedImageProjectData = {
  imageFile?: File;
  additionalImages?: AdditionalImage[];
};

export const transformProjectImageData = (
  formData: FormData
): TransformedImageProjectData => {
  const imageFile = formData.get("imageUrl") as File;
  const additionalImages: AdditionalImage[] = [];
  const entries = Array.from(formData.entries());

  // Find all additional image entries and group them
  entries.forEach(([key, value]) => {
    if (key.startsWith("additionalImages[")) {
      const index = key.match(/\[(\d+)\]/)?.[1];
      if (index) {
        const i = parseInt(index);
        if (!additionalImages[i]) additionalImages[i] = { file: value as File };
        else additionalImages[i].file = value as File;
      }
    } else if (key.startsWith("additionalImageCaptions[")) {
      const index = key.match(/\[(\d+)\]/)?.[1];
      if (index) {
        const i = parseInt(index);
        if (!additionalImages[i])
          additionalImages[i] = { file: null as unknown as File };
        additionalImages[i].caption = value as string;
      }
    } else if (key.startsWith("additionalImageClassNames[")) {
      const index = key.match(/\[(\d+)\]/)?.[1];
      if (index) {
        const i = parseInt(index);
        if (!additionalImages[i])
          additionalImages[i] = { file: null as unknown as File };
        additionalImages[i].className = value as string;
      }
    }
  });

  return { imageFile, additionalImages };
};

type TransformedBasicProjectData = {
  data: Project;
};

export const transformAndValidateBasicProjectData = async (
  formData: FormData
): Promise<ApiResponse<TransformedBasicProjectData>> => {
  try {
    // 1. Convert FormData to object
    const rawData = Object.fromEntries(formData.entries());

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

    // 3. Validate the basic project data, we will validate the images in the next step
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
