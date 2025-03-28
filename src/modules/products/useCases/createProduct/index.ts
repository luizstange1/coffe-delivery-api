import { ProductsRepository } from '../../repositories/Implementations/ProductsRepository';
import { CreateProductController } from './CreateProductController';
import { CreateProductUseCase } from './CreateProductUseCase';

const productsRepository = ProductsRepository.getInstance();
const createProductUseCase = new CreateProductUseCase(productsRepository);
const createProductController = new CreateProductController(
  createProductUseCase
);

export { createProductController };
