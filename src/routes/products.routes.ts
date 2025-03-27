import multer from 'multer';
import { Router } from 'express';
import { storageTypes } from '../config/multerConfig';
import {
  createProductController,
  deleteProductController,
  listProductsController,
} from '../modules/products/useCases';

export const productsRoutes = Router();

const upload = multer({
  storage: storageTypes.s3,
  limits: { fileSize: 2 * 1024 * 1024 },
});

productsRoutes.post('/products', upload.single('file'), (req, res) => {
  return createProductController.handle(req, res);
});

productsRoutes.get('/products', (req, res) => {
  return listProductsController.handle(req, res);
});

productsRoutes.delete('/products/:id', (req, res) => {
  return deleteProductController.handle(req, res);
});
