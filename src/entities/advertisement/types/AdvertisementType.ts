export interface AdvertisementType {
  id: string;
  title: string;
  description: string;
  price: number;
  breed: string;
  monthsAge: number;
  weight: number;
  quantity: number;
  location: string;
  isFrozen: boolean;
  isRetail: boolean;
  dateBegin?: Date;
  dateEnd?: Date;
  killDate?: Date;
  hasMedicalCertificate: true;
  isActive: true;
  creationDate?: Date;
}