import { Request, Response } from 'express';
import { CreateProductUseCase } from './CreateProductUseCase';

interface MulterS3File extends Express.Multer.File {
  location: string;
}

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  handle(req: Request, res: Response) {
    const { name, details, tag, price } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Nenhuma imagem foi selecionada' });
    }

    const s3File = file as MulterS3File;
    const image_path = s3File.location || file.filename;

    this.createProductUseCase.execute({
      name,
      details,
      price,
      tag,
      image_path,
    });

    return res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
  }
}
