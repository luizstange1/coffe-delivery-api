import { Product } from '.prisma/client';
import { String } from 'aws-sdk/clients/apigateway';

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
  delete(id: string): void;
  findById(id: string): Promise<Product | null>;
}
