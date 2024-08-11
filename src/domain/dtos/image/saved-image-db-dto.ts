export class SavedImageDbDto {
  private constructor(
    public externalId: string,
    public name: string,
    public url: string,
    public format: string,
    public size: number,
    public alt: string,
    public location?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, SavedImageDbDto?] {
    const { externalId, name, url, format, size, alt, location } = object;

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
    if (!alt) {
      return ["missing alt"];
    }

    return [
      undefined,
      new SavedImageDbDto(externalId, name, url, format, size, alt, location),
    ];
  }
}
