import "./App.css";
import { Card } from "./components/shared/Card";
import { Section } from "./components/shared/Section";
import { TaskCard } from "./components/TaskCard";
import { UserCard } from "./components/UserCard";

const appName = "TaskFlow";

const users = [
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

const tasks = [
  {
    id: 1,
    title: "Learn Props",
    status: "In Progress",
    priority: "High",
    assignee: "Ayal",
  },
  {
    id: 2,
    title: "Build UserCard",
    status: "To Do",
    priority: "Medium",
    assignee: "Dana",
  },
];

function App() {
  return (
    <>
      <header>
        <h1>{appName}</h1>
      </header>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <main>
        <h2>Welcome to {appName}</h2>
        <Section title="Users">
          <Card>
            <UserCard
              id={users[0].id}
              name={users[0].name}
              role={users[0].role}
              isActive={users[0].isActive}
            />
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
        <section>
          <h2>Task List</h2>
          <TaskCard
            id={tasks[0].id}
            title={tasks[0].title}
            status={tasks[0].status}
            priority={tasks[0].priority}
            assignee={tasks[0].assignee}
          />
          <TaskCard
            id={tasks[1].id}
            title={tasks[1].title}
            status={tasks[1].status}
            priority={tasks[1].priority}
            assignee={tasks[1].assignee}
          />
        </section>
      </main>
      <footer>
        <p>Copyright © 2026 Ayal Laufer</p>
      </footer>
    </>
  );
}

export default App;
