import { Router } from "express";
import { PostgresUserDatasource } from "../../infrastructure/datasources/postgres-user.datasource";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const userRepository = new UserRepositoryImpl(new PostgresUserDatasource());
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    //here we define the routes

    router.post("/login", authController.loginUser);
    router.post("/register", authController.registerUser);

    // router.post("/validate-email");

    return router;
  }
}

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *             example:
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *               firstName:
 *                 type: string
 *                 minLength: 8
 *               lastName:
 *                 type: string
 *                 minLength: 8
 *
 *             example:
 *               email: fake@example.com
 *               password: password1
 *               firstName: jerry
 *               lastName: malloney
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
