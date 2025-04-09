import { Router } from 'express';
import { createUserController } from '../modules/users/useCases/createUser';

export const userRoutes = Router();

userRoutes.post('/user/register', (req, res) => {
  return createUserController.handle(req, res);
});
