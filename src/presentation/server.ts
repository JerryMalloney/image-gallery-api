import express, { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { envs } from "../config/envs";

export class Server {
  private readonly app = express();
  constructor(private PORT: number, private routes: Router) {}

  start() {
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Express Boilerplate",
          version: "1.0.0",
          description:
            "A Express Boilerplate with typescript and clean architecture",
        },
      },
      apis: ["./src/**/*.ts"],
    };

    const specs = swaggerJSDoc(options);

    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    if (envs.NODE_ENV == "development") {
      this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
    }

    this.app.use(this.routes);

    this.app.listen(this.PORT, () => {
      console.log("Working on port:", this.PORT);
    });
  }
}
