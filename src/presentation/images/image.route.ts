import { Router } from "express";
import multer from "multer";
import { CloudinaryImageDatasource } from "../../infrastructure/datasources/cloudinary-images.datasource";
import { CloudinaryImageRepositoryImpl } from "../../infrastructure/repositories/cloudinary-images.repository";
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

    router.get(
      "/",
      upload.array("image"),
      new ImageController(imageService).saveImage
    );

    return router;
  }
}
