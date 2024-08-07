import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { User } from "../entities/user.entity";

export abstract class UserDatasource {
  abstract getUsers(): Promise<User[]>;
  abstract getUserById(id: number): Promise<User | null>;
  abstract getUserByEmail(email: string): Promise<User | null>;
  abstract saveUser(user: RegisterUserDto): Promise<boolean>;
  abstract updateUser(user: UpdateUserDto): Promise<User>;
  abstract deleteUser(id: number): Promise<User>;
}
