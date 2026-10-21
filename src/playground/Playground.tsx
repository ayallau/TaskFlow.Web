import { useState } from "react";
import { EffectCleanupExample } from "./examples/EffectCleanupExample";
import { ClosureCounterExample } from "./examples/ClosureCounterExample";
import { StrictModeDemo } from "./examples/StrictModeDemoWithUseEffect";
import "./Playground.css";

export function Playground() {
  const [showStrictModeDemo, setShowStrictModeDemo] = useState(false);
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
            <h2>StrictMode Demo</h2>
            <p>Inspect effect setup, cleanup and timer behavior.</p>
          </div>

          <span className="playground-tag">React</span>
        </div>

        <button
          type="button"
          onClick={() => setShowStrictModeDemo((prev) => !prev)}
        >
          {showStrictModeDemo ? "Stop Demo" : "Run Demo"}
        </button>

        {showStrictModeDemo && <StrictModeDemo />}
      </section>

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

      <footer className="playground-footer">
        Console output only — experiments are isolated from TaskFlow.
      </footer>
    </main>
  );
}
