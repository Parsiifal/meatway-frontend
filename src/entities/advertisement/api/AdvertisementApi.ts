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
      const token = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzb3ZhZWQucnUiLCJzdWIiOiJhcnRlbWlua2luMjgwNEBnbWFpbC5jb20iLCJleHAiOjE3NDczMjgxMTEsImlhdCI6MTc0NjExODUxMX0.ucchYuldoeRIN36gcAxwl9VBQYo9E5L_56vqk8fbVgUodyeW3OfJ7WDrffWFyMrOwqzi3FS9g7zFFjU0CnnKHFOL4DcKECqJkj34yPmQsZQNTKawdvxnskdjPQwtAX9Vg8-A1T0SOLfFTkQq3465NISA3_M4AL05X4MZ_l66FeuCMnqn44OznW9BDs62NkaJ-pN6FMY1n2bni5VQkpJ2IWyiyxUHWikVU0Xjj35BiipkBAUeMGd3AWvBAxORTyBGzI1CzylGN6lj7LnG3Ku1x5XHU6ZAkCyK4I_yEfuEE4cCWUYVPm1AYo_OcEQTqgp80JrmGiP3BdhCNTIqWUekBQ";

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

