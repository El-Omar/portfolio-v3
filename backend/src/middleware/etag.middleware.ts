import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const etagMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json;

  res.json = function (body: any) {
    const etag = crypto
      .createHash('md5')
      .update(JSON.stringify(body))
      .digest('hex');

    const stringifiedEtag = `"${etag}"`;

    res.setHeader('ETag', stringifiedEtag);

    const clientEtag = req.header('If-None-Match');
    if (clientEtag === stringifiedEtag) {
      return res.status(304).end();
    }

    return originalJson.call(this, body);
  };

  next();
};
