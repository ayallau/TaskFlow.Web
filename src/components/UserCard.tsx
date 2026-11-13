import type { User } from "../types/user";
import { Link } from "react-router";
import { routePaths } from "../routes/routePaths";

export function UserCard({ id, name, role, isActive }: User) {
  return (
    <article>
      <h3>{name}</h3>
      <p>ID: {id}</p>
      <p>Role: {role}</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>
      <Link to={`${routePaths.users}/${id}`}>View Details</Link>
    </article>
  );
}
