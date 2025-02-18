import express from 'express';
import * as routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes.deleteProduct());
app.use(routes.createUser());
app.use(routes.getUserData());
app.use(routes.userLogin());
app.use(routes.productsRoutes);

app.listen(3333, () => {
  console.log('Server running!');
});
