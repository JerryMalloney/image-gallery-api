import { SaveImageDbDto } from "../dtos/image/save-image-db.dto";
import { SaveImageStorageDto } from "../dtos/image/save-image-storage-dto";
import { Image } from "../entities/image.entity";

export abstract class ImageDatasource {
  abstract getImages(): Promise<Image[]>;
  abstract getImage(id: string): Promise<Image>;
  abstract saveImage(
    data: SaveImageDbDto | SaveImageStorageDto
  ): Promise<Image>;
}
