import { useState } from "react";
import { UserCard } from "../components/UserCard";
import { Card } from "../components/shared/Card";
import { Section } from "../components/shared/Section";
import { users } from "../data/users";

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
