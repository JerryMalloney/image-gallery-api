export class SaveImageDbDto {
  private constructor(
    public externalId: string,
    public name: string,
    public alt: string,
    public url: string,
    public format: string,
    public size: number,
    public location: string
  ) {}

  create(object: { [key: string]: any }): [string?, SaveImageDbDto?] {
    const { externalId, name, alt, url, format, size, location } = object;
    if (!externalId) return ["missing externalId"];
    if (!name) return ["missing name"];
    if (!alt) return ["missing alt"];
    if (!url) return ["missing url"];
    if (!format) return ["missing format"];
    if (!size) return ["missing size"];
    if (!location) return ["missing location"];

    return [
      undefined,
      new SaveImageDbDto(externalId, name, alt, url, format, size, location),
    ];
  }
}
