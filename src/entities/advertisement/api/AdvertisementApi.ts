import { AdvertisementType } from "../types/AdvertisementType";
import { BirdAdvertisementType } from "../types/BirdAdvertisementType";

export const AdvertisementApi = {
  async getAll(meatType: string): Promise<{ data?: AdvertisementType[]; error?: string }> {
    try 
    {
      const token = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzb3ZhZWQucnUiLCJzdWIiOiJhcnRlbUBleGFtcGxlLmNvbSIsImV4cCI6MTc0NjExNjkzOSwiaWF0IjoxNzQ0OTA3MzM5fQ.sgNRdEo3j6X4-rHeZTox0G7TggZ5J1u5ZAkjOrDDAEBv63zQsHUF3gN0ZnkuFOqxfmgHx4yuOWBSu3hrlKaZk991iYLwRbjNioxbR8a2eP12r9zj2rizhFyHWtpDBdbYunOO9HF9kmI7NgGUEPxXm1nr8fcQqd2czrZHcZ6Ca8LALjZNR9r3SBsgLgv1JPm2oEUig7C9Jr4qgAgJN9St8MTnAZrr6kDvpQH4ZEB7_hXpWrj1fpEfkOxuyXuv1kZhw2aQ9oBHk3ITt0wThEKe0I-pD5_q4z-GFZbkPzVvpRX8Az-qN3M5J5wplt4wt7xJdhmuy-2IqXJOvRZUvj7Ikw";
      if (!token) {
        return { error: "Отсутствует JWT‑токен. Пожалуйста, авторизуйтесь." };
      }

      const endpointMap: Record<string, string> = {
        all: "/api/v1/advertisements",
        beef: "/api/v1/beefs",
        bird: "/api/v1/birds/2",
        pork: "/api/v1/porks/1",
        sheepmeat: "/api/v1/sheepmeats",
        specialmeat: "/api/v1/others",
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
        if (response.status === 401) {
          return { error: "Токен истёк или недействителен. Пожалуйста, авторизуйтесь снова." };
        }
        return { error: `Ошибка сервера: ${response.status}` };
      }

      const raw = await response.json();
      // если сервер вернул один объект — упаковываем его в массив
      const data = Array.isArray(raw) ? raw : [raw];
      return { data };
    } 
    catch (error) 
    {
      return { error: "Не удалось загрузить объявления. Попробуйте позже." };
    }
  }
};