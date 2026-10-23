import { useState, type ReactNode } from "react";

type PlaygroundCardProps = {
  title: string;
  description: string;
  tag?: string;
  children: ReactNode;
  toggleable?: boolean;
  startLabel?: string;
  stopLabel?: string;
};

export function PlaygroundCard({
  title,
  description,
  tag = "React",
  children,
  toggleable = true,
  startLabel = "Start Demo",
  stopLabel = "Stop Demo",
}: PlaygroundCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="playground-card">
      <div className="playground-card-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <span className="playground-tag">{tag}</span>
      </div>

      {toggleable && (
        <button type="button" onClick={() => setIsVisible((prev) => !prev)}>
          {isVisible ? stopLabel : startLabel}
        </button>
      )}

      {(!toggleable || isVisible) && children}
    </section>
  );
}
