export class UpdateImageDto {
  private constructor(public id: number, public alt: string) {}

  static create(object: { [key: string]: any }): [string?, UpdateImageDto?] {
    const { id, alt } = object;

    if (!id) {
      return ["Missing id"];
    }

    if (isNaN(id)) {
      return ["Id is not a valid number"];
    }

    if (!alt) {
      return ["Missing alt"];
    }

    return [undefined, new UpdateImageDto(id, alt)];
  }
}
