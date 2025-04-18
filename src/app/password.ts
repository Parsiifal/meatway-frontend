// utils/password.ts
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Хэширует пароль.
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Проверяет, что сырой пароль соответствует хэшу.
 */
export async function verifyPassword(
  rawPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(rawPassword, hashedPassword);
}
