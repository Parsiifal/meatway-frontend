import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

const protectedRoutes = ["/main", "/account"];

export default async function middleware(req: NextRequest) {
  
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value; // Получаем токен из кука

  // Для защищенных маршрутов
  if (protectedRoutes.some(route => path.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
    // Проверяем не протух ли токен
    const redirect = await isTokenOutdated(req, token);
    if (redirect) return redirect;
  }

  // Если пользователь аутентифицирован и пытается сделать это снова
  if (["/auth/login", "/auth/registration"].includes(path) && token) {
    // Проверяем не протух ли токен
    const redirect = await isTokenOutdated(req, token);
    if (redirect) return redirect;
    return NextResponse.redirect(new URL("/main", req.nextUrl));
  }

  return NextResponse.next();
}

// Проверяем токен на протухание
async function isTokenOutdated(req: NextRequest, token: string) {
  const payload = decodeJwt(token);
  if (payload.exp && Date.now() > payload.exp * 1000) {
    // токен протух
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
  return undefined;
}