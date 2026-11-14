import { users } from "../data/users";
import type { User } from "../types/user";

export function getUsers(): User[] {
  return structuredClone(users);
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}
