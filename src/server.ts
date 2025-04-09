import express from 'express';
import * as routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes.getUserData());
app.use(routes.userLogin());
app.use(routes.productsRoutes);
app.use(routes.userRoutes);

app.listen(3333, () => {
  console.log('Server running!');
});
