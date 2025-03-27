import { DeleteProductUseCase } from './DeleteProductUseCase';
import { Request, Response } from 'express';

export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  handle(req: Request, res: Response) {
    const { id } = req.params;

    this.deleteProductUseCase.execute(id);
  }
}
