export class SavedImageStorageDto {
  private constructor(
    public externalId: string,
    public name: string,
    public url: string,
    public format: string,
    public size: number,
    public location?: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, SavedImageStorageDto?] {
    const { externalId, name, url, format, size, location } = object;
    console.log(object);

    if (!externalId) {
      return ["missing externalId"];
    }
    if (!name) {
      return ["missing name"];
    }
    if (!url) {
      return ["missing alt"];
    }
    if (!format) {
      return ["missing format"];
    }
    if (!size) {
      return ["missing size"];
    }

    return [
      undefined,
      new SavedImageStorageDto(externalId, name, url, format, size, location),
    ];
  }
}
