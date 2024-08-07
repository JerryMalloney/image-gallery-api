import { CustomError, UpdateUserDto, UserRepository } from "../../domain";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUsers = async (id: number) => {
    return await this.userRepository.getUsers();
  };
  getUserById = async (id: number) => {
    return await this.userRepository.getUserById(id);
  };
  updateUser = async (updateUserDto: UpdateUserDto) => {
    const user = await this.getUserById(updateUserDto.id);
    if (!user)
      throw CustomError.badRequest(`User does not exists: ${updateUserDto.id}`);
    return await this.userRepository.updateUser(updateUserDto);
  };

  deleteUser = async (id: number) => {
    const user = await this.getUserById(id);
    if (!user) throw CustomError.badRequest(`User does not exists: ${id}`);
    return await this.userRepository.deleteUser(id);
  };
}
