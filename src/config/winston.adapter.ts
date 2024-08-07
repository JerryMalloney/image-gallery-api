import winston from "winston";

export class Logger {
  private logger: winston.Logger;
  constructor(private service: string) {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp()
      ),

      defaultMeta: { service: service },
      transports: [
        new winston.transports.File({ filename: "logs/combined.log" }),
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error",
        }),
      ],
    });
  }

  public log(message: string) {
    this.logger.log("info", message);
  }
  public error(message: string) {
    this.logger.error(message);
  }
}
