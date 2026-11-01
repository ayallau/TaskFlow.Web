import { useState } from "react";
import { UserCard } from "../components/UserCard";
import { Card } from "../components/shared/Card";
import { Section } from "../components/shared/Section";
import type { User } from "../types/user";

const users: User[] = [
  { id: "1", name: "Ayal", role: "Developer", isActive: true },
  { id: "2", name: "Dana", role: "Designer", isActive: false },
];

export function UsersPage() {
  const [currentUser, setCurrentUser] = useState(users[0]);

  function handlePromoteUser() {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      role: "Senior Developer",
    }));
  }

  return (
    <Section title="Users">
      <button type="button" onClick={handlePromoteUser}>
        Promote User
      </button>

      <Card>
        <UserCard {...currentUser} />
      </Card>

      <Card>
        <UserCard {...users[1]} />
      </Card>
    </Section>
  );
}
