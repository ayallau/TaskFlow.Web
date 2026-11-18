export type UserRole = "user" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  role: UserRole;
};
