import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount((prevCount) => prevCount + 1);
  }

  function handleDecrement() {
    setCount((prevCount) => prevCount - 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <>
      <h2>Counter</h2>

      <p>Count: {count}</p>

      <button type="button" onClick={handleIncrement}>
        Increment
      </button>

      <button type="button" onClick={handleDecrement}>
        Decrement
      </button>

      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </>
  );
}
