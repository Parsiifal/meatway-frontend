import { LoadSpinner } from "./LoadSpinner";
import { type UploadFilesFormUIProps } from "@/shared/S3/types";


export function UploadFilesFormUI({ isLoading, fileInputRef, uploadToServer }: UploadFilesFormUIProps) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Добавляем предотвращение дефолтного поведения
    uploadToServer(e);
  };
  
  return (


    <div className="grid grid-cols-12 gap-x-4 mt-8 ">

      {isLoading ? (<LoadSpinner/>) : 
        (
          <div className="col-span-5 col-start-2 border border-blue-500">
            {/* Скрытый input */}
            <input
              id="fileInput"
              type="file"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleSubmit}
            />
              
            {/* Кнопка для открытия диалога выбора файла */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-md bg-blue-500 text-white hover:bg-blue-800"
              disabled={isLoading}>
              Изменить аватарку
            </button>
          </div>
        )}
        
          
    </div>


  );
}