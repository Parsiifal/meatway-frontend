import {
  AdvertisementUnion,
  BeefAdvertisementType,
  BirdAdvertisementType,
  PorkAdvertisementType,
  SheepmeatAdvertisementType,
  SpecialmeatAdvertisementType
} from "../types/AdvertisementType";

type ApiResponse = Omit<AdvertisementUnion, "meatType"> & {
  isHalal?: boolean;
  isMramor?: boolean;
  birdType?: string;
  
};

export const AdvertisementApi = {
  async getAll(meatType: string): Promise<{ data?: AdvertisementUnion[]; error?: string }> {
    try 
    {
      const token = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzb3ZhZWQucnUiLCJzdWIiOiJhcnRlbUBleGFtcGxlLmNvbSIsImV4cCI6MTc0NjExNjkzOSwiaWF0IjoxNzQ0OTA3MzM5fQ.sgNRdEo3j6X4-rHeZTox0G7TggZ5J1u5ZAkjOrDDAEBv63zQsHUF3gN0ZnkuFOqxfmgHx4yuOWBSu3hrlKaZk991iYLwRbjNioxbR8a2eP12r9zj2rizhFyHWtpDBdbYunOO9HF9kmI7NgGUEPxXm1nr8fcQqd2czrZHcZ6Ca8LALjZNR9r3SBsgLgv1JPm2oEUig7C9Jr4qgAgJN9St8MTnAZrr6kDvpQH4ZEB7_hXpWrj1fpEfkOxuyXuv1kZhw2aQ9oBHk3ITt0wThEKe0I-pD5_q4z-GFZbkPzVvpRX8Az-qN3M5J5wplt4wt7xJdhmuy-2IqXJOvRZUvj7Ikw";

      const endpointMap: Record<string, string> = {
        all: "/api/v1/advertisements",
        beef: "/api/v1/beefs/3",
        bird: "/api/v1/birds/2",
        pork: "/api/v1/porks/1",
        sheepmeat: "/api/v1/sheepmeats/4",
        specialmeat: "/api/v1/specialmeats/5",
      };

      const endpoint: string = endpointMap[meatType] || endpointMap.all;

      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return this.handleError(response.status);
      }

      const raw = await response.json();
      // если сервер вернул один объект — упаковываем его в массив
      const data = Array.isArray(raw) ? raw : [raw];
      return { data: AdvertisementApi.normalizeData(data, meatType) };
    } 
    catch (error) 
    {
      return { error: "Не удалось загрузить объявления. Попробуйте позже." };
    }
  },

  handleError(status: number): { error: string } {
    switch (status) {
    case 401:
      return { error: "Токен истёк или недействителен. Пожалуйста, авторизуйтесь снова." };
    case 403:
      return { error: "Доступ запрещён" };
    default:
      return { error: `Ошибка сервера: ${status}` };
    }
  },

  normalizeData(data: ApiResponse[], meatType: string): AdvertisementUnion[] {
    const normalizers: Record<string, (item: ApiResponse) => AdvertisementUnion> = {
      beef: (item) => ({
        ...item,
        meatType: "beef",
        isHalal: item.isHalal ?? false,
        isMramor: item.isMramor ?? false,
      } as BeefAdvertisementType),
      
      bird: (item) => ({
        ...item,
        meatType: "bird",
        isHalal: item.isHalal ?? false,
        birdType: item.birdType || "Не указано",
      } as BirdAdvertisementType),

      pork: (item) => ({
        ...item,
        meatType: "pork"
      } as PorkAdvertisementType),
      
      sheepmeat: (item) => ({
        ...item,
        meatType: "sheepmeat",
        isHalal: item.isHalal ?? false
      } as SheepmeatAdvertisementType),
      
      specialmeat: (item) => ({
        ...item,
        meatType: "specialmeat",
        isHalal: item.isHalal ?? false
      } as SpecialmeatAdvertisementType)
    };

    return data.map(normalizers[meatType] ?? ((item) => item as AdvertisementUnion));
  }

  
};

