import { useState } from "react";
import { Counter } from "../components/playground/Counter";
import { Section } from "../components/shared/Section";

export function DashboardPage() {
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  return (
    <Section title="Dashboard">
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
    </Section>
  );
}
