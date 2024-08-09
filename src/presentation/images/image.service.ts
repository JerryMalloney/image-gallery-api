import { SaveImageStorageDto } from "../../domain/dtos/image/save-image-storage-dto";
import { CloudinaryImageRepositoryImpl } from "../../infrastructure/repositories/cloudinary-images.repository";

export class ImageService {
  constructor(private storageRepo: CloudinaryImageRepositoryImpl) {}

  async saveImage(data: SaveImageStorageDto) {
    const result = await this.storageRepo.saveImage(data);
    return result;
  }
}
