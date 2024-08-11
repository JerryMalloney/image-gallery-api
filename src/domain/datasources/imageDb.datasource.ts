import { SaveImageDbDto } from "../dtos/image/save-image-db.dto";
import { Image } from "../entities/image.entity";

export abstract class ImageDbDatasource {
  abstract getImages(): Promise<Image[]>;
  abstract getImage(id: string): Promise<Image>;
  abstract saveImage(data: SaveImageDbDto): Promise<Image>;
}
