import { CreateUserUseCase } from './CreateUserUseCase';
import { Request, Response } from 'express';

export class CreateUserController {
  constructor(private createUserController: CreateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { name, surname, email, password } = req.body;

    const user = await this.createUserController.execute({
      name,
      surname,
      email,
      password,
    });

    return res.status(201).json(user);
  }
}
