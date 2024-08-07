export class CustomError extends Error {
  private constructor(public statusCode: number, public message: string) {
    super(message);
  }

  static badRequest(message: string) {
    return new CustomError(400, message);
  }

  static unauthorized(message: string) {
    return new CustomError(401, message);
  }

  static internalServer(message: string) {
    return new CustomError(500, message);
  }
}
