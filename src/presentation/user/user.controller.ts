import { Request, Response } from "express";
import { UpdateUserDto } from "../../domain";
import { ErrorHandler } from "../shared/errorHandler";
import { UserService } from "./user.service";

export class UserController {
  private errorSource = "userService";
  constructor(private userService: UserService) {}

  getUsers = (req: Request, res: Response) => {
    this.userService
      .getUsers(req.body.user.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => ErrorHandler.handle(err, res, this.errorSource));
  };

  getUserById = (req: Request, res: Response) => {
    this.userService
      .getUserById(req.body.user.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => ErrorHandler.handle(err, res, this.errorSource));
  };

  updateUser = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [err, updateUserDto] = UpdateUserDto.create({ ...req.body, id });
    if (err) return res.status(400).json({ error: err });

    this.userService
      .updateUser(updateUserDto!)
      .then((result) => res.status(200).json(result))
      .catch((err) => ErrorHandler.handle(err, res, this.errorSource));
  };

  deleteUser = (req: Request, res: Response) => {
    const id = +req.params.id;

    this.userService
      .deleteUser(id)
      .then((result) => {
        console.log(result);
        res.status(200).json({ message: "User Deleted Successfully" });
      })
      .catch((err) => ErrorHandler.handle(err, res, this.errorSource));
  };
}
