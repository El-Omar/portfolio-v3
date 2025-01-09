import crypto from 'crypto';

export const generateEtag = (data: any): string => {
  const stringified = JSON.stringify(data);
  return crypto.createHash('md5').update(stringified).digest('hex');
};

export const compareEtags = (etag1: string, etag2: string): boolean => {
  return etag1 === etag2;
};
