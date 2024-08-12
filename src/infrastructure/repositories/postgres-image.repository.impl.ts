import { Image, ImageDbRepository, SaveImageDbDto } from "../../domain";
import { PostgresImageDatasource } from "../datasources/postgres-image.datasource";

export class PostgresImageRepository implements ImageDbRepository {
  constructor(
    private readonly postgresImageDatasource: PostgresImageDatasource
  ) {}
  async getImages(): Promise<Image[]> {
    return this.postgresImageDatasource.getImages();
  }
  async getImage(id: number): Promise<Image> {
    return this.postgresImageDatasource.getImage(id);
  }
  async saveImage(data: SaveImageDbDto): Promise<Image> {
    return this.postgresImageDatasource.saveImage(data);
  }
}
