export class UpdateUserDto {
  private constructor(
    public id: number,
    public firstName?: string,
    public lastName?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { id, firstName, lastName } = object;
    if (!id) return ["Missing id"];
    if (!firstName) return ["Missing first name"];
    if (!lastName) return ["Missing last name"];

    return [undefined, new UpdateUserDto(id, firstName, lastName)];
  }
}
