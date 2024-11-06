import express from "express";
import {
  createProduct,
  createUser,
  deleteProduct,
  getProducts,
  getUsers,
} from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(getProducts());
app.use(createProduct());
app.use(deleteProduct());
app.use(createUser());
app.use(getUsers());

app.listen(3333, () => {
  console.log("Server running!");
});
