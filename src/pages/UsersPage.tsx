import { useState } from "react";
import { UserCard } from "../components/user/UserCard";
import { Card } from "../components/shared/Card";
import { Section } from "../components/shared/Section";
import { getUsers } from "../services/usersService";
import type { AuthUser } from "../types/auth";

type UsersPageProps = {
  role: AuthUser["role"] | undefined;
};

export function UsersPage({ role }: UsersPageProps) {
  const isAdmin = role === "admin";
  const [users, setUsers] = useState(getUsers());

  function handlePromoteUserTitle(userId: string) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId && user.jobTitle.startsWith("Senior") === false
          ? { ...user, jobTitle: `Senior ${user.jobTitle}` }
          : user,
      ),
    );
  }

  return (
    <Section title="Users">
      <>
        {users.map((user) => (
          <Card key={user.id}>
            <UserCard
              {...user}
              isAdmin={isAdmin}
              onPromoteUserTitle={handlePromoteUserTitle}
            />
          </Card>
        ))}
      </>
    </Section>
  );
}
