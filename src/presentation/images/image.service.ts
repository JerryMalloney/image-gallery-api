import {
  CustomError,
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

  async deleteImage(id: number) {
    const imageExists = await this.imageDbRepo.getImage(id);
    if (!imageExists) {
      throw CustomError.badRequest("image does not exists");
    }

    const resultFromStorage = await this.imageStorageRepo.deleteImage(
      imageExists.externalId
    );

    if (!resultFromStorage) {
      throw CustomError.internalServer("error deleting file from storage");
    }

    const resultFromDb = await this.imageDbRepo.deleteImage(imageExists.id);
  }
}
