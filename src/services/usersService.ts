import { users } from "../data/users";
import type { User } from "../types/user";
import { updateUserData } from "../data/users";

export function getUsers(): User[] {
  return structuredClone(users);
}

export function getUserById(id: string): User | undefined {
  const user = users.find((user) => user.id === id);
  return user ? structuredClone(user) : undefined;
}

export function updateUser(updatedUser: User): boolean {
  return updateUserData(updatedUser);
}
