import "./App.css";
import { Header } from "./components/layout/Header";
import { MainContent } from "./components/layout/MainContent";
import { Sidebar } from "./components/layout/Sidebar";
import { Card } from "./components/shared/Card";
import { Section } from "./components/shared/Section";
import { UserCard } from "./components/UserCard";
import { useState } from "react";
import { Counter } from "./components/playground/Counter";
import type { User } from "./types/user";
import { TasksPage } from "./components/TasksPage";

const appName = "TaskFlow";

const users: User[] = [
  {
    id: "1",
    name: "Ayal",
    role: "Developer",
    isActive: true,
  },
  {
    id: "2",
    name: "Dana",
    role: "Designer",
    isActive: false,
  },
];

function App() {
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  function handlePromoteUser() {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      role: "Senior Developer",
    }));
  }

  return (
    <>
      <Header title={appName} />

      <Sidebar />

      <MainContent>
        <Section title="Users">
          <button type="button" onClick={handlePromoteUser}>
            Promote User
          </button>
          <Card>
            <UserCard {...currentUser} />
          </Card>
          <Card>
            <UserCard
              id={users[1].id}
              name={users[1].name}
              role={users[1].role}
              isActive={users[1].isActive}
            />
          </Card>
        </Section>

        <TasksPage />

        <button
          type="button"
          onClick={() => setIsPlaygroundOpen((prev) => !prev)}
        >
          {isPlaygroundOpen ? "Hide Exercises" : "Show Exercises"}
        </button>
        {isPlaygroundOpen && (
          <Section title="Exercises">
            <Counter />
          </Section>
        )}
      </MainContent>

      <footer>
        <p>Copyright © 2026 Ayal Laufer</p>
      </footer>
    </>
  );
}

export default App;
