import { Router } from 'express';
import { createUserController } from '../modules/users/useCases/createUser';
import { getUserDataController } from '../modules/users/useCases/getUserData';

export const userRoutes = Router();

userRoutes.get('/user/:id', (req, res) => {
  return getUserDataController.handle(req, res);
});

userRoutes.post('/user/register', (req, res) => {
  return createUserController.handle(req, res);
});
