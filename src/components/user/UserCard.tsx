import type { User } from "../../types/user";

export function UserCard({ id, name, jobTitle, role, isActive }: User) {
  return (
    <article>
      <h3>{name}</h3>
      <p>ID: {id}</p>
      <p>Job Title: {jobTitle}</p>
      <p>Role: {role}</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>
    </article>
  );
}
