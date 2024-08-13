import {
  Image,
  ImageStorageRepository,
  SavedImageStorageDto,
  SaveImageStorageDto,
} from "../../domain";
import { CloudinaryImageDatasource } from "../datasources/cloudinary-images.datasource";

export class CloudinaryImageRepositoryImpl implements ImageStorageRepository {
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

  deleteImage = async (id: string): Promise<Boolean> => {
    return this.imageDatasource.deleteImage(id);
  };
}
