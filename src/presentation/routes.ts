import { Router } from "express";
import { AuthRoutes } from "./auth/auth.route";
import { UserRoutes } from "./user/user.route";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //here we define the routes

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/user", UserRoutes.routes);

    return router;
  }
}

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
