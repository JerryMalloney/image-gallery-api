import { Image, ImageDbRepository, SaveImageDbDto } from "../../domain";
import { PostgresImageDatasource } from "../datasources/postgres-image.datasource";

export class PostgresImageRepository implements ImageDbRepository {
  constructor(
    private readonly postgresImageDatasource: PostgresImageDatasource
  ) {}
  async getImages(): Promise<Image[]> {
    throw new Error("Method not implemented.");
  }
  async getImage(id: string): Promise<Image> {
    throw new Error("Method not implemented.");
  }
  async saveImage(data: SaveImageDbDto): Promise<Image> {
    return this.postgresImageDatasource.saveImage(data);
  }
}
