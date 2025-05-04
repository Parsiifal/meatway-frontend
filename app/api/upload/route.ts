// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { Client } from "minio";

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT!,
  port: Number(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
});

export async function POST(request: Request) {
  
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json(
      { error: "No files uploaded" },
      { status: 400 }
    );
  }

  try {
    const uploadResults = await Promise.all(
      files.map(async (file) => {

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `user-avatar-${Date.now()}.jpg`;

        // Отправляем на сервер имя файла для сохранения в бд
        // const response = await fetch(`${process.env.SERVER_URL}/`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     name: fileName,
        //   }),
        // });
    
        // const result = await response.json();

        // // Обработка ошибок с сервера
        // if (!response.ok) {
          
        // }

        await minioClient.putObject(
          process.env.MINIO_BUCKET_NAME!,
          fileName,
          buffer,
          file.size,
          { "Content-Type": file.type }
        );

        return {
          fileName,
          originalName: file.name,
          size: file.size,
          url: `${process.env.MINIO_PUBLIC_URL}/${process.env.MINIO_BUCKET_NAME}/${fileName}`,
          mimetype: file.type
        };
      })
    );

    return NextResponse.json({
      status: "success",
      data: uploadResults
    });

  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}