import { envs } from "../../config/envs";
import { CustomError } from "../../domain";
import { ImageDatasource } from "../../domain/datasources/image.datasource";
import { SaveImageStorageDto } from "../../domain/dtos/image/save-image-storage-dto";
import { SavedImageStorageDto } from "../../domain/dtos/image/saved-image-storage-dto";
import { Image } from "../../domain/entities/image.entity";

import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: envs.CLOUDINARY_NAME,
  api_key: envs.API_KEY,
  api_secret: envs.API_SECRET,
  secure: true,
});

export class CloudinaryImageDatasource implements ImageDatasource {
  getImages(): Promise<Image[]> {
    throw new Error("Method not implemented.");
  }
  getImage(id: string): Promise<Image> {
    throw new Error("Method not implemented.");
  }
  async saveImage(
    imagedto: SaveImageStorageDto
  ): Promise<SavedImageStorageDto> {
    const result = await new Promise((resolve, error) => {
      cloudinary.v2.uploader
        .upload_stream(
          { filename_override: imagedto.name },
          (error, uploadResult) => {
            if (error)
              throw CustomError.internalServer("file couldn't be uploaded");
            return resolve(uploadResult);
          }
        )
        .end(imagedto.buffer);
    });
    const data = result as cloudinary.UploadApiResponse;
    const [error, dto] = SavedImageStorageDto.create({
      externalId: data.public_id,
      name: data.original_filename,
      url: data.url,
      format: data.format,
      size: data.bytes,
      location: data.folder,
    });

    if (error) throw CustomError.internalServer(error);

    return dto!;
  }
}
