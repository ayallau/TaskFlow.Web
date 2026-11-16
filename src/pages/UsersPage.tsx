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
  const users = getUsers();

  const [currentUser, setCurrentUser] = useState(users[0]);

  function handlePromoteUser() {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      role: "Senior Developer",
    }));
  }

  return (
    <Section title="Users">
      {isAdmin && (
        <button type="button" onClick={handlePromoteUser}>
          Promote User
        </button>
      )}

      <Card>
        <UserCard {...currentUser} />
      </Card>

      <Card>
        <UserCard {...users[1]} />
      </Card>
    </Section>
  );
}
