// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IncomingForm } from "formidable";

declare module "formidable" {
  
  interface File {
    filepath: string;
    mimetype?: string;
    originalFilename?: string;
    newFilename: string;
    size: number;
  }

  export interface Fields {
    [key: string]: string | string[];
  }

  export interface Files {
    [key: string]: File | File[];
  }
}