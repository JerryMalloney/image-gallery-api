import { Router } from "express";
import multer from "multer";
import { CloudinaryImageDatasource } from "../../infrastructure/datasources/cloudinary-images.datasource";
import { CloudinaryImageRepositoryImpl } from "../../infrastructure/repositories/cloudinary-images.repository";
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
const imageService = new ImageService(cloudinaryImageRepository);

export class ImageRoute {
  static get routes(): Router {
    const router = Router();

    router.post(
      "/",
      upload.array("image", 1),
      new FileUploadMiddleware([".jpg", ".jpeg", ".png"]).hasExtensions,
      new ImageController(imageService).saveImage
    );

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
 *   post:
 *     summary: Upload a image
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
