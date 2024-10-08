import jwt from "jsonwebtoken";
import { envs } from "./envs";

export class JsonWebTokenAdapter {
  static generateToken(payload: any, duration: string = "2h") {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        envs.JWT_SECRET_KEY,
        { expiresIn: duration },
        (err, token) => {
          if (err) return resolve(null);

          resolve(token);
        }
      );
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
