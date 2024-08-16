import { SaveImageDbDto } from "../dtos/image/save-image-db.dto";
import { UpdateImageDto } from "../dtos/image/update-image.dto";
import { Image } from "../entities/image.entity";

export abstract class ImageDbRepository {
  abstract getImages(): Promise<Image[]>;
  abstract getImage(id: number): Promise<Image>;
  abstract saveImage(data: SaveImageDbDto): Promise<Image>;
  abstract deleteImage(id: number): Promise<Image>;
  abstract updateImage(data: UpdateImageDto): Promise<Image>;
}
