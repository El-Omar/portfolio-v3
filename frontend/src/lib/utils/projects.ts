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
    const index = key.match(/\[(\d+)\]/)?.[1];
    if (!index) {
      return;
    }

    const currentIndex = parseInt(index);

    if (key.startsWith("additionalImages[")) {
      if (value instanceof File) {
        if (!additionalImages[currentIndex]) {
          additionalImages[currentIndex] = { file: value, preview: "" };
        } else {
          additionalImages[currentIndex].file = value;
        }
      }
    } else if (key.startsWith("additionalImageCaptions[")) {
      if (!additionalImages[currentIndex]) {
        additionalImages[currentIndex] = {
          file: null,
          preview: "",
        };
      }
      additionalImages[currentIndex].caption = value as string;
    } else if (key.startsWith("additionalImageClassNames[")) {
      if (!additionalImages[currentIndex]) {
        additionalImages[currentIndex] = {
          file: null,
          preview: "",
        };
      }
      additionalImages[currentIndex].className = value as string;
    }
    else if (key.startsWith("additionalImageUrls[")) {
      if (!additionalImages[currentIndex]) {
        additionalImages[currentIndex] = {
          file: null,
          preview: value as string,
        };
      }
      additionalImages[currentIndex].preview = value as string;
    }
  });

  return {
    imageFile: imageFile instanceof File ? imageFile : undefined,
    additionalImages,
  };
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
      githubUrl: rawData.githubUrl ? String(rawData.githubUrl) : undefined,
      liveUrl: rawData.liveUrl ? String(rawData.liveUrl) : undefined,
      videoUrl: rawData.videoUrl ? String(rawData.videoUrl) : undefined,
      content: rawData.content ? String(rawData.content) : undefined,
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
