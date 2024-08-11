import { NextFunction, Request, Response } from "express";
import path from "path";
export class FileUploadMiddleware {
  constructor(private filters: string[]) {}

  hasExtensions = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) {
      return res.status(400).json({ error: "no file were provided" });
    }

    const files = req.files as Express.Multer.File[];
    if (!files[0]) {
      return res.status(400).json({ error: "file missing" });
    }
    const fileExtension = path.parse(files[0].originalname).ext;

    if (!this.filters.includes(fileExtension)) {
      return res
        .status(400)
        .json({ error: `Invalid extension, only: ${this.filters}` });
    }
    next();
  };
}
