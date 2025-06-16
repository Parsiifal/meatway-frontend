import { NextResponse } from "next/server";
import minioClient from "@/shared/minio/minioClient";

const DEFAULT_FILENAME = "Default avatar.jpg";


export async function GET(request: Request) {
  try {
    console.warn("Generated URL:");

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

    const Url = `${process.env.MINIO_BROWSER_URL}/${process.env.MINIO_BUCKET_NAME}/${filename}`;
    // const url = await minioClient.presignedGetObject(
    //   "meatway-bucket",
    //   filename,
    //   60 * 60
    // );
    // const url = "https://cs14.pikabu.ru/post_img/big/2023/06/12/2/1686533632189022938.jpg";

    const url = Url.replace("http://minio:9000", "http://localhost:9000");

    return NextResponse.json({
      status: "success",
      data: {
        filename: filename,
        url,
        downloadUrl: `${url}?download=1`
      }
    });

  } 
  catch (err) {
    if (err === "NotFound") return NextResponse.json({ error: "File not found" }, { status: 404 });
    return NextResponse.json({ error: err });
  }
}