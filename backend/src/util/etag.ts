import crypto from 'crypto';
import { Request, Response } from 'express';

export const generateEtag = (body: any) =>
  crypto.createHash('md5').update(JSON.stringify(body)).digest('hex');

type ValidateEtagResult =
  | {
      isValid: true;
      statusCode?: number;
      message?: string;
    }
  | {
      isValid: false;
      statusCode: number;
      message: string;
    };

export const validateEtag = (
  etag: string,
  clientEtag: string | undefined
): ValidateEtagResult => {
  if (clientEtag && clientEtag !== etag) {
    return {
      isValid: false,
      statusCode: 412,
      message: 'Precondition Failed: Etag mismatch between client and server',
    };
  }

  return { isValid: true };
};
