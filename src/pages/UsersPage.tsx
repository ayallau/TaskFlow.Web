import { useState } from "react";
import { UserCard } from "../components/user/UserCard";
import { Card } from "../components/shared/Card";
import { Section } from "../components/shared/Section";
import { getUsers, updateUser } from "../services/usersService";
import type { AuthUser } from "../types/auth";
import { Link } from "react-router";
import { routePaths } from "../routes/routePaths";

type UsersPageProps = {
  role: AuthUser["role"] | undefined;
};

export function UsersPage({ role }: UsersPageProps) {
  const isAdmin = role === "admin";
  const [users, setUsers] = useState(getUsers());

  function handlePromoteUserTitle(userId: string) {
    const userToUpdate = users.find((user) => user.id === userId);

    if (!userToUpdate || userToUpdate.jobTitle.startsWith("Senior")) {
      return;
    }

    const success = updateUser({
      ...userToUpdate,
      jobTitle: `Senior ${userToUpdate.jobTitle}`,
    });

    if (!success) {
      console.error(`Failed to promote user ${userId}`);
      return;
    }

    setUsers(getUsers());
  }

  return (
    <Section title="Users">
      {users.map((user) => (
        <Card key={user.id}>
          <UserCard {...user} />
          <Link to={`${routePaths.users}/${user.id}`}>View Details</Link>
          {isAdmin && (
            <p>
              <button
                type="button"
                onClick={() => handlePromoteUserTitle(user.id)}
              >
                Promote User Title
              </button>
            </p>
          )}
        </Card>
      ))}
    </Section>
  );
}
