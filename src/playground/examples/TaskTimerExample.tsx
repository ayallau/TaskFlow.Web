import { useEffect, useState } from "react";

export function TaskTimerExample() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    /* 
    const intervalId = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    */

    /* 
    const intervalId = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        if (next === 3) {
          debugger;
        }
        return next;
      });
    }, 1000);
    */

    const intervalId = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        // if (next === 3) {
        //   debugger;
        // }
        return next; // Breakpoint here
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setElapsedSeconds(0);
  }

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  return (
    <section>
      <h3>Task Timer</h3>

      <p>Elapsed: {formattedTime}</p>

      <button type="button" onClick={handleStart} disabled={isRunning}>
        Start
      </button>

      <button type="button" onClick={handlePause} disabled={!isRunning}>
        Pause
      </button>

      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </section>
  );
}
