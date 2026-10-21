import { useEffect, useState } from "react";

const MAX_COUNT = 5;

export function InfiniteEffectLoopExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= MAX_COUNT) {
      console.log("Loop stopped:", count);
      return;
    }

    console.log("Effect executed:", count);

    const timeoutId = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [count]);

  return (
    <section>
      <h3>Infinite Effect Loop Demo</h3>

      <p>Count: {count}</p>

      {count >= MAX_COUNT && <p>Loop stopped at {MAX_COUNT} updates.</p>}
    </section>
  );
}
