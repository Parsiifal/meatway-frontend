type Photo = {
  path: string;
}

export type UserDataType = {
  id: number
  email: string
  name?: string
  surname?: string
  city?: string
  phoneNumber?: string
  photo?: Photo
}

export type UpdateUserDataType = {
  name?: string;
  surname?: string;
  city?: string;
  phoneNumber?: string;
  photo?: Photo;
};

export type UploadResponse = {
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