type Task = {
  id: number;
  title: string;
  status: "open" | "done";
  priority: "low" | "medium" | "high";
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Learn React",
    status: "open",
    priority: "high",
  },
  {
    id: 2,
    title: "Build TaskFlow",
    status: "done",
    priority: "medium",
  },
  {
    id: 3,
    title: "Practice TypeScript",
    status: "open",
    priority: "low",
  },
];

export function TaskList() {
  const selectedStatus = "open";
  const visibleTasks = tasks
    .filter((task) => task.status === selectedStatus)
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <section>
      {visibleTasks.map((task) => (
        <article key={task.id}>
          <h3>{task.title}</h3>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
        </article>
      ))}
    </section>
  );
}
