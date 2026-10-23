import { useState } from "react";
import { EffectCleanupExample } from "./examples/EffectCleanupExample";
import { ClosureCounterExample } from "./examples/ClosureCounterExample";
import { StrictModeDemo } from "./examples/StrictModeDemoWithUseEffect";
import "./Playground.css";
import { InfiniteEffectLoopExample } from "./examples/InfiniteEffectLoopExample";
import { StaleCounter } from "./examples/StaleValues";
import { DerivedValueExample } from "./examples/DerivedValueExample";
import { PlaygroundCard } from "./PlaygroundCard";

export function Playground() {
  const [showEffectDemo, setShowEffectDemo] = useState(false);
  const [intervalInput, setIntervalInput] = useState(1000);
  const [intervalMs, setIntervalMs] = useState(1000);
  function handleRunCounter() {
    ClosureCounterExample();
  }

  const isValidInterval =
    Number.isFinite(intervalInput) &&
    intervalInput >= 100 &&
    intervalInput <= 10000;

  function handleUpdateInterval() {
    if (!isValidInterval) {
      return;
    }

    setIntervalMs(intervalInput);
  }

  return (
    <main className="playground">
      <header className="playground-header">
        <h1>TaskFlow Playground</h1>
        <p>
          React and JavaScript experiments. Open browser DevTools to inspect
          console output.
        </p>
      </header>

      <section className="playground-card">
        <div className="playground-card-heading">
          <div>
            <h2>Closure Counter</h2>
            <p>Demonstrate lexical scope and independent bindings.</p>
          </div>

          <span className="playground-tag">JavaScript</span>
        </div>

        <button type="button" onClick={handleRunCounter}>
          Run Example
        </button>
      </section>

      <section className="playground-card">
        <div className="playground-card-heading">
          <div>
            <h2>Effect Cleanup</h2>
            <p>Change the interval and observe cleanup before setup.</p>
          </div>

          <span className="playground-tag">React</span>
        </div>

        <div className="playground-controls">
          <label htmlFor="interval-ms">Interval (ms)</label>

          <input
            id="interval-ms"
            type="number"
            min={100}
            max={10000}
            step={100}
            value={intervalInput}
            onChange={(event) =>
              setIntervalInput(event.currentTarget.valueAsNumber)
            }
          />

          <button
            type="button"
            onClick={handleUpdateInterval}
            disabled={!isValidInterval || intervalInput === intervalMs}
          >
            Update Interval
          </button>

          <button
            type="button"
            className="playground-button-secondary"
            onClick={() => setShowEffectDemo((prev) => !prev)}
          >
            {showEffectDemo ? "Stop Effect" : "Start Effect"}
          </button>
        </div>

        <p className="playground-info">
          Active interval: <strong>{intervalMs} ms</strong>
        </p>

        {showEffectDemo && <EffectCleanupExample intervalMs={intervalMs} />}
      </section>

      <section className="playground-card">
        <div className="playground-card-heading">
          <div>
            <h2>Derived Value</h2>
            <p>
              Demonstrates calculating derived values directly from state
              without redundant effects or additional state.
            </p>
          </div>

          <span className="playground-tag">React</span>
        </div>

        <DerivedValueExample />
      </section>

      <PlaygroundCard
        title="StrictMode Demo"
        description="Inspect effect setup, cleanup and timer behavior."
        startLabel="Run Demo"
        stopLabel="Stop Demo"
      >
        <StrictModeDemo />
      </PlaygroundCard>

      <PlaygroundCard
        title="Infinite Effect Loop"
        description="Demonstrates an effect that repeatedly updates its own dependency."
        startLabel="Start Loop"
        stopLabel="Stop Loop"
      >
        <InfiniteEffectLoopExample />
      </PlaygroundCard>

      <PlaygroundCard
        title="Stale Counter"
        description="Demonstrates stale values in a closure."
        startLabel="Start Counter"
        stopLabel="Stop Counter"
      >
        <StaleCounter />
      </PlaygroundCard>

      <footer className="playground-footer">
        Console output only — experiments are isolated from TaskFlow.
      </footer>
    </main>
  );
}
