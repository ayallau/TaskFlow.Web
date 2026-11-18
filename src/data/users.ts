import type { User } from "../types/user";

export const users: User[] = [
  {
    id: "1",
    name: "Ayal",
    role: "admin",
    jobTitle: "Developer",
    isActive: true,
    email: "ayal@taskflow.com",
  },
  {
    id: "2",
    name: "Dana",
    role: "user",
    jobTitle: "UI/UX Designer",
    isActive: true,
    email: "dana@taskflow.com",
  },
];

export function updateUserData(updatedUser: User): boolean {
  const index = users.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    return true;
  }
  return false;
}
