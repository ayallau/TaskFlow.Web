import { useEffect } from "react";

export function ClosureEffectCleanupExample({
  intervalMs,
}: {
  intervalMs: number;
}) {
  useEffect(() => {
    console.log("Setup:", intervalMs);

    const intervalId = setInterval(() => {
      console.log("Tick:", intervalMs);
    }, intervalMs);

    return () => {
      clearInterval(intervalId);
      console.log("Cleanup:", intervalMs);
    };
  }, [intervalMs]);

  return null;
}
