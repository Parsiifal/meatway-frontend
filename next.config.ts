import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "backend",
        port: "8080",
        
      },
      {
        protocol: "http",
        hostname: "minio", // Для внутренних запросов (SSR)
        port: "9000",
        pathname: "/meatway-bucket/**"
      },
      {
        protocol: "http",
        hostname: "localhost", // Для клиентских запросов
        port: "9000",
        pathname: "/meatway-bucket/**"
      }
    ],
    domains: ["cs14.pikabu.ru"],
  },
  // Явно перечислите необходимые серверные переменные
  env: {
    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
    MINIO_PORT: process.env.MINIO_PORT,
    MINIO_BUCKET_NAME: process.env.MINIO_BUCKET_NAME,
    MINIO_ROOT_USER: process.env.MINIO_ACCESS_KEY,
    MINIO_ROOT_PASSWORD: process.env.MINIO_SECRET_KEY,
    MINIO_USE_SSL: process.env.MINIO_USE_SSL,
  },
};

export default nextConfig;
