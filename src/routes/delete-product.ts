import { Router } from "express";
import { prisma } from "../lib/prisma";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";

config();

const s3 = new S3Client({ region: process.env.AWS_DEFAULT_REGION });

export function deleteProduct() {
  const router = Router();

  router.delete("/products/:id", async (req, res) => {
    try {
      const deletedProduct = await prisma.product.delete({
        where: {
          id: req.params.id,
        },
      });

      const imageToBeDeleted = deletedProduct.image_path.split("/")[3];

      const imageToBeDeletedFromAWS = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageToBeDeleted,
      });

      await s3.send(imageToBeDeletedFromAWS);

      return res.json(deletedProduct);
    } catch (error) {
      console.log(error);
    }
  });
  return router;
}
