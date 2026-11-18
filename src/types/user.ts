import type { UserRole } from "./auth";

export type User = {
  id: string;
  name: string;
  role: UserRole;
  jobTitle: string;
  isActive: boolean;
};
