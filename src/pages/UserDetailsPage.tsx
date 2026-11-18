import { Link, useParams } from "react-router";
import { getUserById } from "../services/usersService";
import { routePaths } from "../routes/routePaths";
import { Card } from "../components/shared/Card";
import { UserCard } from "../components/user/UserCard";

export function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Invalid user ID.</p>;
  }

  const user = getUserById(id);

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <>
      <h2>User Details</h2>
      <Card>
        <UserCard {...user} />
        <Link to={routePaths.users}>Back to Users</Link>
      </Card>
    </>
  );
}
