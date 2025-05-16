"use server";
export async function handleApiResponse<T>(response: Response): Promise<T> {
  switch (response.status) {
  case 200: // OK
  case 201: // Created
    return await response.json() as T;
    
  case 400:
    throw new Error("400 Некорректные данные запроса!");
    
  case 401:
    throw new Error("401 Требуется авторизация!");
    
  case 403:
    throw new Error("403 Недостаточно прав!");
    
  case 404:
    throw new Error("404 Ресурс не найден!");
    
  case 422:
    const validationErrors = await response.json();
    throw new Error(`422 Ошибки валидации: ${JSON.stringify(validationErrors)}`);
    
  case 500:
    throw new Error("500 Внутренняя ошибка сервера!");
    
  default:
    throw new Error(`Неожиданный статус ответа: ${response.status}!`);
  }
}