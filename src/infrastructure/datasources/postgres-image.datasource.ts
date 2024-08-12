import { CustomError, Image, SaveImageDbDto } from "../../domain";
import { ImageDbDatasource } from "../../domain/datasources/imageDb.datasource";

import prisma from "../db.instance";

export class PostgresImageDatasource implements ImageDbDatasource {
  async getImages(): Promise<Image[]> {
    const result = await prisma.image.findMany();
    return result.map((image) => Image.fromObject(image));
  }
  async getImage(id: number): Promise<Image> {
    const result = await prisma.image.findUnique({
      where: {
        id: id,
      },
    });

    if (!result) {
      throw CustomError.badRequest("Image not found");
    }

    return Image.fromObject(result);
  }
  async saveImage(data: SaveImageDbDto): Promise<Image> {
    const result = await prisma.image.create({
      data: data,
    });

    return Image.fromObject(result);
  }
}
