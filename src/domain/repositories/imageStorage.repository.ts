import { SaveImageStorageDto } from "../dtos/image/save-image-storage-dto";
import { SavedImageStorageDto } from "../dtos/image/saved-image-storage-dto";
import { Image } from "../entities/image.entity";

export abstract class ImageStorageRepository {
  abstract getImages(): Promise<Image[]>;
  abstract getImage(id: string): Promise<Image>;
  abstract saveImage(data: SaveImageStorageDto): Promise<SavedImageStorageDto>;
  abstract deleteImage(id: string): Promise<Boolean>;
}
