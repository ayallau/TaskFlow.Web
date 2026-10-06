import "./App.css";
import { Header } from "./components/layout/Header";
import { MainContent } from "./components/layout/MainContent";
import { Sidebar } from "./components/layout/Sidebar";
import { Card } from "./components/shared/Card";
import { Section } from "./components/shared/Section";
import { TaskCard } from "./components/TaskCard";
import { UserCard } from "./components/UserCard";
import type { Task } from "./types/task";
import { useState } from "react";
import { Counter } from "./components/playground/Counter";
import type { User } from "./types/user";

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

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Learn Props",
    status: "open",
    priority: "high",
    assignee: "Ayal",
  },
  {
    id: 2,
    title: "Build UserCard",
    status: "done",
    priority: "medium",
    assignee: "Dana",
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  const visibleTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleAddTask() {
    const newTask: Task = {
      id: Date.now(),
      title: "New Task",
      status: "open",
      priority: "medium",
      assignee: "Ayal",
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function handleDeleteTask(taskId: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.currentTarget.value);
  }

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

        <Section title="Tasks">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks"
          />
          <button type="button" onClick={handleAddTask}>
            Add Task
          </button>

          {visibleTasks.map((task) => (
            <Card key={task.id}>
              <TaskCard {...task} />

              <button type="button" onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
            </Card>
          ))}
        </Section>

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
