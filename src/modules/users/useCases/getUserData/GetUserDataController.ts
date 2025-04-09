import { GetUserDataUseCase } from './GetUserDataUseCase';
import { Request, Response } from 'express';

export class GetUserDataController {
  constructor(private getUserDataUseCase: GetUserDataUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.getUserDataUseCase.execute(id);

    return res.status(200).json(user);
  }
}
