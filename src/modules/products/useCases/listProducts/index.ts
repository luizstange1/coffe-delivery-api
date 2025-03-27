import { ProductsRepository } from '../../repositories/Implementations/ProductsRepository';
import { ListProductsController } from './listProductsController';
import { ListProductsUseCase } from './listProductsUseCase';

const listProductsRepository = ProductsRepository.getInstance();
const listProductsUseCase = new ListProductsUseCase(listProductsRepository);
const listProductsController = new ListProductsController(listProductsUseCase);

export { listProductsController };
