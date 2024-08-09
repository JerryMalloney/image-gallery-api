import { SaveImageStorageDto } from "../../domain/dtos/image/save-image-storage-dto";
import { SavedImageStorageDto } from "../../domain/dtos/image/saved-image-storage-dto";
import { Image } from "../../domain/entities/image.entity";
import { ImageRepository } from "../../domain/repositories/image.repository";
import { CloudinaryImageDatasource } from "../datasources/cloudinary-images.datasource";

export class CloudinaryImageRepositoryImpl implements ImageRepository {
  constructor(private readonly imageDatasource: CloudinaryImageDatasource) {}
  getImages(): Promise<Image[]> {
    throw new Error("Method not implemented.");
  }
  getImage(id: string): Promise<Image> {
    throw new Error("Method not implemented.");
  }
  saveImage = async (
    data: SaveImageStorageDto
  ): Promise<SavedImageStorageDto> => {
    return await this.imageDatasource.saveImage(data);
  };
}
