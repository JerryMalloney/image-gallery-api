import { NextFunction, Request, Response } from "express";
import { JsonWebTokenAdapter } from "../../config/jsonwebtoken.adapter";
import { User } from "../../domain";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";

export class AuthMiddleware {
  constructor(private userRepository: UserRepositoryImpl) {}
  public validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header("authorization");
    if (!authorization)
      return res.status(401).json({ error: "No Token provided" });
    if (!authorization.startsWith("Bearer"))
      return res.status(401).json({ error: "Invalid Bearer token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JsonWebTokenAdapter.validateToken<{ id: number }>(
        token
      );
      if (!payload) return res.status(401).json({ error: "Invalid token" });
      const user = await this.userRepository.getUserById(payload.id);
      if (!user) return res.status(401).json({ error: "Invalid token" });

      req.body.user = User.fromObject(user);
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
}
