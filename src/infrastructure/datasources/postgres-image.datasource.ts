import { CustomError, Image, SaveImageDbDto } from "../../domain";
import { ImageDbDatasource } from "../../domain/datasources/imageDb.datasource";
import { UpdateImageDto } from "../../domain/dtos/image/update-image.dto";

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
  async deleteImage(id: number): Promise<Image> {
    const result = await prisma.image.delete({
      where: { id: id },
    });

    return Image.fromObject(result);
  }
  async updateImage(data: UpdateImageDto): Promise<Image> {
    const result = await prisma.image.update({
      where: {
        id: data.id,
      },
      data: {
        alt: data.alt,
      },
    });

    return Image.fromObject(result);
  }
}
