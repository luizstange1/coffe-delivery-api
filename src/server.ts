import express from "express";
import * as routes from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes.getProducts());
app.use(routes.createProduct());
app.use(routes.deleteProduct());
app.use(routes.createUser());
app.use(routes.getUsers());
app.use(routes.userLogin());

app.listen(3333, () => {
  console.log("Server running!");
});
