import express from "express";
import { createProducts, getProducts } from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(getProducts());
app.use(createProducts());

app.listen(3333, () => {
  console.log("Server running!");
});
