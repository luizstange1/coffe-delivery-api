import { Router } from "express";
import { prisma } from "../lib/prisma";

export function getProducts(): Router {
  const router = Router();

  router.get("/products", async (req, res) => {
    try {
      const product = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          details: true,
          tag: true,
          price: true,
          image_path: true,
        },
      });

      return res.json(product);
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
      res.status(500).json({ error: "Erro ao obter produtos" });
    }
  });

  return router;
}
