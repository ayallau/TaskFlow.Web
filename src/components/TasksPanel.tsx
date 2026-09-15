type Task = {
  id: number;
  title: string;
};

const tasks: Task[] = [
  { id: 1, title: "Learn React" },
  { id: 2, title: "Build TaskFlow" },
];

export function TasksPanel() {
  const isLoading = false;
  const error = "";

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error.length > 0) {
    return <p>Error: {error}</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <section>
      {tasks.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
    </section>
  );
}
