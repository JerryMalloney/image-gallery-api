export class RegisterUserDto {
  private constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { firstName, lastName, email, password } = object;
    if (!firstName) return ["Missing first name"];
    if (!lastName) return ["Missing last name"];
    if (!email) return ["Missing email name"];
    if (!password) return ["Missing password name"];

    return [
      undefined,
      new RegisterUserDto(firstName, lastName, email, password),
    ];
  }
}
