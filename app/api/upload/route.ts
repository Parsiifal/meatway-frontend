import { NextResponse } from "next/server";
import minioClient from "@/shared/minio/minioClient";


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