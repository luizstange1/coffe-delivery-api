import express from "express";
import { createProduct, deleteProduct, getProducts } from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(getProducts());
app.use(createProduct());
app.use(deleteProduct());

app.listen(3333, () => {
  console.log("Server running!");
});
