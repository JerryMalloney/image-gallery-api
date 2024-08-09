import cloudinary from "cloudinary";
import { Request, Response } from "express";
import { envs } from "../../config/envs";
import { SaveImageStorageDto } from "../../domain/dtos/image/save-image-storage-dto";
import { ErrorHandler } from "../shared/errorHandler";
import { ImageService } from "./image.service";

cloudinary.v2.config({
  cloud_name: envs.CLOUDINARY_NAME,
  api_key: envs.API_KEY,
  api_secret: envs.API_SECRET,
  secure: true,
});

export class ImageController {
  private errorSource = "imageController";
  constructor(private imageService: ImageService) {}

  saveImage = (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const fileName = files[0].originalname.split(".").at(0);

    const [error, imageDto] = SaveImageStorageDto.create({
      buffer: files[0].buffer,
      name: fileName,
    });
    if (error) return res.status(400).json("buffer or name not provided");

    this.imageService
      .saveImage(imageDto!)
      .then((result) => res.status(200).json(result))
      .catch((error) => ErrorHandler.handle(error, res, this.errorSource));

    // const result = await new Promise((resolve) => {
    //   cloudinary.v2.uploader
    //     .upload_stream({ filename_override: "test" }, (error, uploadResult) => {
    //       return resolve(uploadResult);
    //     })
    //     .end(files[0].buffer);
    // });
    // console.log(result as cloudinary.UploadApiResponse);
    // console.log("working");
  };
}
