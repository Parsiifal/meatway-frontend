import { Client } from "minio";

const minioClient = new Client({
  endPoint: String(process.env.MINIO_ENDPOINT),
  port: Number(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
});

export default minioClient;