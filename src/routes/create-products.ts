import { Router } from "express";
import { prisma } from "../lib/prisma";
import multer from "multer";
import { storageTypes } from "../config/multerConfig";

interface ProductProps {
  name: string;
  details: string;
  tag: string;
  price: number;
}

interface MulterS3File extends Express.Multer.File {
  location: string;
}

export function createProducts(): Router {
  const router = Router();
  const upload = multer({
    storage: storageTypes.s3,
    limits: { fileSize: 2 * 1024 * 1024 },
  });

  router.post("/products", upload.single("file"), async (req, res) => {
    const { name, details, tag, price } = req.body as ProductProps;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Nenhuma imagem foi selecionada" });
    }

    const s3File = file as MulterS3File;
    const image_path = s3File.location || file.filename;

    try {
      const product = await prisma.product.create({
        data: {
          name,
          details,
          tag,
          price,
          image_path,
        },
      });

      return res.json(product);
    } catch (error) {
      console.error("Erro ao criar produto", error);
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  });

  return router;
}
