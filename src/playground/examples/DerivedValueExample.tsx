import { useState } from "react";
// import { useEffect } from "react";

type DemoTask = {
  id: number;
  title: string;
  status: "open" | "done";
};

const initialTasks: DemoTask[] = [
  { id: 1, title: "Learn useEffect", status: "done" },
  { id: 2, title: "Practice React", status: "open" },
  { id: 3, title: "Build TaskFlow", status: "open" },
];

export function DerivedValueExample() {
  const [tasks, setTasks] = useState<DemoTask[]>(initialTasks);

  // This is a common anti-pattern. Avoid it:

  //   const [completedCount, setCompletedCount] = useState(1);
  //
  //   useEffect(() => {
  //     const count = tasks.filter((task) => task.status === "done").length;
  //
  //     setCompletedCount(count);
  //   }, [tasks]);
  // ------------------------------------------------------------

  // Correct pattern: derive the value directly from state

  const completedCount = tasks.filter((task) => task.status === "done").length;

  function handleToggleTask(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "done" ? "open" : "done",
            }
          : task,
      ),
    );
  }

  return (
    <section>
      <h3>Derived Value Demo</h3>

      <p>Completed tasks: {completedCount}</p>

      {tasks.map((task) => (
        <div key={task.id}>
          <span>
            {task.title} — {task.status}
          </span>
          <button type="button" onClick={() => handleToggleTask(task.id)}>
            Toggle Status
          </button>
        </div>
      ))}
    </section>
  );
}
