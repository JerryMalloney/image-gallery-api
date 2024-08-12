import {
  ImageDbRepository,
  ImageStorageRepository,
  SaveImageDbDto,
  SaveImageStorageDto,
} from "../../domain";

export class ImageService {
  constructor(
    private imageStorageRepo: ImageStorageRepository,
    private imageDbRepo: ImageDbRepository
  ) {}

  async getImages() {
    return await this.imageDbRepo.getImages();
  }

  async getImage(id: number) {
    return await this.imageDbRepo.getImage(id);
  }

  async saveImage(data: SaveImageStorageDto) {
    const result = await this.imageStorageRepo.saveImage(data);

    const [error, savedImageDbDto] = SaveImageDbDto.create({
      ...result,
      alt: data.alt,
    });
    return await this.imageDbRepo.saveImage(savedImageDbDto!);
  }
}
