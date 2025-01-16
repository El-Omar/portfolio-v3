export type AdditionalImage = {
  file: File | null;
  preview: string;
  caption?: string;
  className?: string;
};

export type ValidateAndUploadImageResult =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data: string;
    };
