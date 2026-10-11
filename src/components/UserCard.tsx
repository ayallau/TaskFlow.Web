// UserCard responsibility:
// This component is responsible for displaying a single user's relevant information, such as name, role, and status.

import type { User } from "../types/user";

export function UserCard({ id, name, role, isActive }: User) {
  return (
    <article>
      <h3>{name}</h3>
      <p>ID: {id}</p>
      <p>Role: {role}</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>
    </article>
  );
}
