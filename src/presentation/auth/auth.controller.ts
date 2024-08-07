import { Request, Response } from "express";
import { LoginUserDto, RegisterUserDto } from "../../domain";
import { ErrorHandler } from "../shared/errorHandler";
import { AuthService } from "./auth.service";

export class AuthController {
  private errorSource = "authService";
  constructor(public readonly authService: AuthService) {}

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json(error);
    //2. log in user and return response
    this.authService
      .loginUser(loginUserDto!)
      .then((result) => res.json(result))
      .catch((error) => {
        ErrorHandler.handle(error, res, this.errorSource);
      });
  };

  registerUser = (req: Request, res: Response) => {
    // create user with dto
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json(error);
    // register user with service and return response
    this.authService
      .registerUser(registerUserDto!)
      .then((result) => res.json(result))
      .catch((error) => {
        ErrorHandler.handle(error, res, this.errorSource);
      });
  };
}
