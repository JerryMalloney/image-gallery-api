import {
  RegisterUserDto,
  UpdateUserDto,
  User,
  UserDatasource,
  UserRepository,
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}
  async getUsers(): Promise<User[]> {
    return await this.userDatasource.getUsers();
  }
  async getUserById(id: number): Promise<User | null> {
    return await this.userDatasource.getUserById(id);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userDatasource.getUserByEmail(email);
  }
  async saveUser(user: RegisterUserDto): Promise<boolean> {
    return await this.userDatasource.saveUser(user);
  }
  async updateUser(user: UpdateUserDto): Promise<User> {
    return await this.userDatasource.updateUser(user);
  }
  async deleteUser(id: number): Promise<User> {
    return await this.userDatasource.deleteUser(id);
  }
}
