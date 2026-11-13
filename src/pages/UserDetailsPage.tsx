import { Link, useParams } from "react-router";
import { users } from "../data/users";
import { routePaths } from "../routes/routePaths";

export function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Invalid user ID.</p>;
  }

  const user = users.find((item) => item.id === id);

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <article>
      <h1>{user.name}</h1>
      <p>ID: {user.id}</p>
      <p>Role: {user.role}</p>
      <p>Status: {user.isActive ? "Active" : "Inactive"}</p>

      <Link to={routePaths.users}>Back to Users</Link>
    </article>
  );
}
