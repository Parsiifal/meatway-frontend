// components/UploadFilesForm.tsx
import { useState, useRef } from "react";
import { UploadFilesFormUI } from "./UploadFilesFormUI";
import { uploadFiles } from "@/shared/S3/file-api";



export function UploadFilesRoute() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleUpload = async (e: React.FormEvent) => {

    e.preventDefault();
    
    if (!fileInputRef.current?.files?.length) return;

    setIsLoading(true);
    
    try {
      const result = await uploadFiles(
        Array.from(fileInputRef.current.files)
      );

      if (result.status === "success") {
        console.info("Uploaded files:", result.data);
      } else {
        console.error("Upload failed:", result.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <UploadFilesFormUI
      isLoading={isLoading}
      fileInputRef={fileInputRef}
      uploadToServer={handleUpload}
    />
  );
}