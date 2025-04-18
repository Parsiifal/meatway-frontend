// utils/db.ts
import { Pool } from "pg";
import { hashPassword, verifyPassword } from "./password";

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

/** Тип юзера из БД */
export interface DbUser {
  id: string;
  name: string;
  email: string;
  password: string; // именно хэш
}

/** Находит пользователя по email */
export async function getUserByEmail(email: string): Promise<DbUser | null> {
  const { rows } = await pool.query<DbUser>(
    "SELECT id, name, email, password FROM users WHERE email = $1",
    [email]
  );
  return rows[0] ?? null;
}

/** Регистрирует нового пользователя */
export async function createUser(
  name: string,
  email: string,
  rawPassword: string
): Promise<Pick<DbUser, "id" | "name" | "email">> {
  const pwHash = await hashPassword(rawPassword);
  const { rows } = await pool.query<DbUser>(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, pwHash]
  );
  return rows[0];
}

/** Проверяет учётку: если есть и пароль верный — отдаёт пользователя, иначе null */
export async function getUserFromDb(
  email: string,
  rawPassword: string
): Promise<Pick<DbUser, "id" | "name" | "email"> | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const isValid = await verifyPassword(rawPassword, user.password);
  return isValid
    ? { id: user.id, name: user.name, email: user.email }
    : null;
}
