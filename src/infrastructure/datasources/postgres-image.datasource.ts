import { Image, SaveImageDbDto } from "../../domain";
import { ImageDbDatasource } from "../../domain/datasources/imageDb.datasource";

import prisma from "../db.instance";

export class PostgresImageDatasource implements ImageDbDatasource {
  getImages(): Promise<Image[]> {
    throw new Error("Method not implemented.");
  }
  getImage(id: string): Promise<Image> {
    throw new Error("Method not implemented.");
  }
  async saveImage(data: SaveImageDbDto): Promise<Image> {
    const result = await prisma.image.create({
      data: data,
    });

    return Image.fromObject(result);
  }
}
