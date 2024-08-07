export class SaveImageStorageDto {
  private constructor(public buffer: Buffer, public name: string) {}

  create(object: { [key: string]: any }): [string?, SaveImageStorageDto?] {
    const { buffer, name } = object;

    if (!buffer) {
      return ["missing buffer"];
    }
    if (!name) {
      return ["missing name"];
    }

    return [undefined, new SaveImageStorageDto(buffer, name)];
  }
}
