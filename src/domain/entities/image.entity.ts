import { CustomError } from "../errors/custom.error";

export class Image {
  constructor(
    public id: number,
    public externalId: string,
    public name: string,
    public alt: string,
    public url: string,
    public format: string,
    public size: number,
    public location: string
  ) {}

  static fromObject(object: { [key: string]: any }): Image {
    const { id, externalId, name, alt, url, format, size, location } = object;

    if (!id) {
      throw CustomError.badRequest("Missing id");
    }
    if (!externalId) {
      throw CustomError.badRequest("Missing externalId");
    }
    if (!name) {
      throw CustomError.badRequest("Missing name");
    }
    if (!alt) {
      throw CustomError.badRequest("Missing alt");
    }
    if (!url) {
      throw CustomError.badRequest("Missing url");
    }
    if (!format) {
      throw CustomError.badRequest("Missing format");
    }
    if (!size) {
      throw CustomError.badRequest("Missing size");
    }

    return new Image(id, externalId, name, alt, url, format, size, location);
  }
}
