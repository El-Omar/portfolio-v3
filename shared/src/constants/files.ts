import { toBytes } from "../utils";

export const IMAGE_MAX_SIZE = toBytes({ MB: 5 });

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  "image/gif",
  "image/svg+xml",
];
