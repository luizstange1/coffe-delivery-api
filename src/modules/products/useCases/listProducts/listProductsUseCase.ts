import { IProductsRepository } from '../../repositories/IProductsRepository';

export class ListProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  execute() {
    const products = this.productsRepository.findAll();

    return products;
  }
}
