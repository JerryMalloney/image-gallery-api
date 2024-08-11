export class SaveImageStorageDto {
  private constructor(
    public buffer: Buffer,
    public name: string,
    public alt: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, SaveImageStorageDto?] {
    const { buffer, name, alt = name } = object;

    if (!buffer) {
      return ["missing buffer"];
    }
    if (!name) {
      return ["missing name"];
    }

    return [undefined, new SaveImageStorageDto(buffer, name, alt)];
  }
}
