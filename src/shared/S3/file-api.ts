// src/shared/api/file-api.ts
type UploadResponse = {
  status: "success" | "error";
  data?: Array<{
    fileName: string;
    originalName: string;
    size: number;
    url: string;
    mimetype: string;
  }>;
  message?: string;
};

export const uploadFiles = async (files: File[]): Promise<UploadResponse> => {
  const formData = new FormData();
  
  files.forEach(file => {
    formData.append("files", file);
  });

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Network error",
    };
  }
};