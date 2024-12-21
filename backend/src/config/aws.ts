import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env";

// Making sure we have 1 instance of the s3 client
export const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});
