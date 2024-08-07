import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { JsonWebTokenAdapter } from "../../config/jsonwebtoken.adapter";
import { CustomError, LoginUserDto, User } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";

export class AuthService {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  public async loginUser(loginUserDto: LoginUserDto) {
    // get user and validate it's correct
    const user = await this.userRepository.getUserByEmail(loginUserDto.email);
    if (!user) throw CustomError.badRequest("Email or password wrong");

    const isMatch = BcryptAdapter.compare(loginUserDto.password, user.password);

    if (!isMatch) throw CustomError.badRequest("Email or password wrong");

    // create user and extract password

    const { password, ...userEntity } = User.fromObject(user);

    // generate access jwt

    const token = await JsonWebTokenAdapter.generateToken({
      id: userEntity.id,
      email: userEntity.email,
    });

    return { user: userEntity, token };
  }

  public async registerUser(registerUserDto: RegisterUserDto) {
    // check if email it's already created
    const user = await this.userRepository.getUserByEmail(
      registerUserDto.email
    );
    if (user)
      throw CustomError.badRequest("User with this email it's already created");
    // encrypt user password
    registerUserDto.password = BcryptAdapter.hash(registerUserDto.password);

    // save user
    try {
      const Created = await this.userRepository.saveUser(registerUserDto);
      return Created ? "User Created Succesfully" : false;
    } catch (error) {
      return CustomError.internalServer("Error Regsiterting new user");
    }
  }
}
