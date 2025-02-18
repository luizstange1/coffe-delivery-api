import {
  ICreateProductDTO,
  IProductsRepository,
} from '../../repositories/IProductsRepository';

export class CreateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  execute({ name, details, price, tag, image_path }: ICreateProductDTO) {
    this.productsRepository.create({
      name,
      details,
      price,
      tag,
      image_path,
    });
  }
}
