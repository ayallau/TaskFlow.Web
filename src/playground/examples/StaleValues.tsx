import { useEffect, useState } from "react";

export function StaleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Count:", count); // stale - always 0 - Closure on first render
      //setCount(count + 1); // stale - always 1 - Closure on first render
      setCount((prev) => prev + 1); // not stale - always incrementing - functional update
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <p>Count: {count}</p>;
}
