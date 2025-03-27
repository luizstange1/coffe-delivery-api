import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { IProductsRepository } from '../../repositories/IProductsRepository';
import { config } from 'dotenv';
import { Omics } from 'aws-sdk';

config();

const s3 = new S3Client({ region: process.env.AWS_DEFAULT_REGION });

export class DeleteProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(id: string) {
    const imageToBeDeleted = await this.productsRepository
      .findById(id)
      .then((product) => {
        return product?.image_path.split('/')[3];
      });

    const imageToBeDeletedFromAWS = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageToBeDeleted,
    });

    await s3.send(imageToBeDeletedFromAWS);

    this.productsRepository.delete(id);
  }
}
