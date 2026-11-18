import type { LoginFormValues } from "../types/loginFormValues";
import type { AuthUser } from "../types/auth";
import { getUserByEmail } from "./usersService";

const demoCredentials = [
  { email: "ayal@taskflow.com", password: "ayalPass123" },
  { email: "dana@taskflow.com", password: "danaPass123" },
];

export function authenticate(values: LoginFormValues): AuthUser | null {
  const validCredentials = demoCredentials.some(
    (account) =>
      account.email === values.email && account.password === values.password,
  );

  if (!validCredentials) {
    return null;
  }

  const user = getUserByEmail(values.email);

  if (!user || !user.isActive) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    role: user.role,
  };
}
