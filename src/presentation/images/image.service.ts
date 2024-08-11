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

  async saveImage(data: SaveImageStorageDto) {
    const result = await this.imageStorageRepo.saveImage(data);

    const [error, savedImageDbDto] = SaveImageDbDto.create({
      ...result,
      alt: data.alt,
    });
    return await this.imageDbRepo.saveImage(savedImageDbDto!);
  }
}
