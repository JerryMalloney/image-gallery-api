import bcrypt from "bcrypt";

export class BcryptAdapter {
  static hash = (password: string) => {
    return bcrypt.hashSync(password, 10);
  };

  static compare = (password: string, hashed: string) => {
    return bcrypt.compareSync(password, hashed);
  };
}
