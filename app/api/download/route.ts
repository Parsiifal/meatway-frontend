// app/api/files/route.ts
import { NextResponse } from "next/server";
import { Client } from "minio";

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT!,
  port: Number(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
});

const DEFAULT_FILENAME = "Default avatar.jpg";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let filename = searchParams.get("filename");

    // Проверяем наличие имени файла в запросе
    if (!filename) return NextResponse.json({ error: "Ошибка в API роуте загрузки аватарки!" }, { status: 400 });
    
    // Получение запрошенного файла
    try {
      await minioClient.statObject(process.env.MINIO_BUCKET_NAME!, filename);
    }
    // На случай если на сервере есть информация о названии файла, а по факту в minio такого файла нет (например, был удален)
    catch (error) {
      filename = DEFAULT_FILENAME;
      await minioClient.statObject(process.env.MINIO_BUCKET_NAME!, filename);
    }

    const url = `${process.env.MINIO_PUBLIC_URL}/${process.env.MINIO_BUCKET_NAME}/${filename}`;

    return NextResponse.json({
      status: "success",
      data: {
        filename: filename,
        url,
        downloadUrl: `${url}?download=1`
      }
    });

  } 
  catch (error) {
    if (error === "NotFound") return NextResponse.json({ error: "File not found" }, { status: 404 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}