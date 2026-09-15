type Task = {
  id: number;
  title: string;
};

const tasks: Task[] = [
  { id: 1, title: "Learn React" },
  { id: 2, title: "Build TaskFlow" },
  { id: 3, title: "Practice TypeScript" },
];

export function TaskList() {
  return (
    <section>
      {tasks.map((task) => (
        <article key={task.id}>
            <h3>{task.title}</h3>
        </article>
      ))}
    </section>
  );
}