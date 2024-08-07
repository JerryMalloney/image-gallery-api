import { CustomError } from "../errors/custom.error";

export class User {
  constructor(
    public id: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public emailValidated: boolean,
    public password: string,
    public role: string,
    public disabled: boolean,
    public img?: string
  ) {}

  static fromObject(object: { [key: string]: any }): User {
    const {
      id,
      email,
      firstName,
      lastName,
      emailValidated = false,
      password,
      role,
      disabled = false,
    } = object;

    if (!id) throw CustomError.badRequest("no id provided");
    if (!email) throw CustomError.badRequest("no email provided");
    if (!firstName) throw CustomError.badRequest("no first name provided");
    if (!lastName) throw CustomError.badRequest("no last name provided");
    if (!password) throw CustomError.badRequest("no password provided");

    return new User(
      id,
      email,
      firstName,
      lastName,
      emailValidated,
      password,
      role,
      disabled
    );
  }
}
