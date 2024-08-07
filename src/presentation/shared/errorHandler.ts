import { Response } from "express";
import { Logger } from "../../config/winston.adapter";
import { CustomError } from "../../domain";

export class ErrorHandler {
  static handle(error: unknown, res: Response, errorSource: string) {
    const logger = new Logger(errorSource);
    if (error instanceof CustomError) {
      logger.error(error.message);
      return res.status(error.statusCode).json({ error: error.message });
    }
    logger.error(`${error}`);
    return res.status(500).json({ error: "Internal server Error" });
  }
}
