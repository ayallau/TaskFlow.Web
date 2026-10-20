import { useEffect } from "react";

let activeTimers = 0;

export function StrictModeDemo() {
  useEffect(() => {
    activeTimers++;
    console.log("Active timers:", activeTimers);

    // Example for memory leak in development mode + strict mode enabled.
    // Comment cleanup function to see it.
    const intervalId = setInterval(() => {
      console.log("Tick");
    }, 1000);

    return () => {
      clearInterval(intervalId); // Comment this line to see memory leak in development mode
      activeTimers--;
      console.log("Active timers:", activeTimers);
    };
  }, []);

  return <h2>StrictMode Demo</h2>;
}
