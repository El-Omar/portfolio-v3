import { Request, Response, NextFunction } from 'express';
import { generateEtag } from '../util/etag';

export const etagMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json;

  res.json = function (body: any) {
    const etag = generateEtag(body);
    res.setHeader('ETag', etag);

    // For GET requests - caching
    if (req.method === 'GET') {
      const clientEtag = req.header('If-None-Match');

      if (clientEtag === etag) {
        return res.status(304).end();
      }
    }

    return originalJson.call(this, body);
  };

  next();
};
