import { Product } from '.prisma/client';

export interface ICreateProductDTO {
  name: string;
  details: string;
  price: number;
  tag: string;
  image_path: string;
}

export interface IProductsRepository {
  create({ name, details, tag, price, image_path }: ICreateProductDTO): void;
  findAll(): Promise<Product[]>;
}
