import multer, { memoryStorage } from 'multer';
import { Router } from 'express';
import { storageTypes } from '../config/multerConfig';
import { createProductController } from '../modules/products/useCases/createProduct';
import { listProductsController } from '../modules/products/useCases/listProducts';

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
