import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Playground } from "./Playground";

const rootElement = document.getElementById("playground-root");

if (!rootElement) {
  throw new Error("Playground root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
