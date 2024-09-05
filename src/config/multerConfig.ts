import { S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "dotenv";

config();

const s3Config = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },

    filename: (req, file, cb) => {
      const fileExtension = file.originalname.split(".")[1];

      const fileName = crypto.randomBytes(16).toString("hex");

      cb(null, `${fileName}.${fileExtension}`);
    },
  }),
  s3: multerS3({
    s3: s3Config,
    bucket: process.env.AWS_BUCKET_NAME || "",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      const fileExtension = file.originalname.split(".")[1];

      const fileName = crypto.randomBytes(16).toString("hex");

      cb(null, `${fileName}.${fileExtension}`);
    },
  }),
};
