export function ClosureCounterExample() {
  function createCounter() {
    let count = 0;

    return function increment() {
      count++;
      console.log("Count:", count);
    };
  }

  const counterA = createCounter();
  const counterB = createCounter();

  counterA(); // 1
  counterA(); // 2
  counterB(); // 1
  counterA(); // 3
}
