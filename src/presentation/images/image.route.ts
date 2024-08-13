import { Router } from "express";
import multer from "multer";
import {
  CloudinaryImageDatasource,
  CloudinaryImageRepositoryImpl,
  PostgresImageDatasource,
  PostgresImageRepository,
} from "../../infrastructure";
import { FileUploadMiddleware } from "../middlewares/fileUploadFilter.middleware";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5242880,
  },
});

const cloudinaryImageDatasource = new CloudinaryImageDatasource();
const cloudinaryImageRepository = new CloudinaryImageRepositoryImpl(
  cloudinaryImageDatasource
);

const postgresImageRepository = new PostgresImageRepository(
  new PostgresImageDatasource()
);
const imageService = new ImageService(
  cloudinaryImageRepository,
  postgresImageRepository
);

const imageController = new ImageController(imageService);

export class ImageRoute {
  static get routes(): Router {
    const router = Router();

    router.get("/", imageController.getImages);
    router.get("/:id", imageController.getImage);

    router.post(
      "/",
      upload.array("image", 1),
      new FileUploadMiddleware([".jpg", ".jpeg", ".png"]).hasExtensions,
      imageController.saveImage
    );

    router.delete("/:id", imageController.deleteImage);

    return router;
  }
}

/**
 * @swagger
 * tags:
 *   name: Image
 */

/**
 * @swagger
 * /api/image/:
 *   get:
 *     summary: get all images
 *     tags: [Image]
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
 * /api/image/{id}:
 *   get:
 *     summary: get image from id
 *     tags: [Image]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
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
 * /api/image/:
 *   post:
 *     summary: Upload a image .jpg .jpeg .png
 *     tags: [Image]
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *           image:
 *             type: string
 *             format: binary
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
