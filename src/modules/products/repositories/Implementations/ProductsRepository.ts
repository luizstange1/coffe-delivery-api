import { ICreateProductDTO, IProductsRepository } from '../IProductsRepository';
import { prisma } from '../../../../lib/prisma';
import { Product } from '.prisma/client';

export class ProductsRepository implements IProductsRepository {
  private static INSTANCE: ProductsRepository;

  public static getInstance(): ProductsRepository {
    if (!ProductsRepository.INSTANCE) {
      ProductsRepository.INSTANCE = new ProductsRepository();
    }

    return ProductsRepository.INSTANCE;
  }

  async create(data: ICreateProductDTO) {
    return await prisma.product.create({
      data,
    });
  }

  async findAll() {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        details: true,
        tag: true,
        price: true,
        image_path: true,
      },
    });

    return products;
  }
}
