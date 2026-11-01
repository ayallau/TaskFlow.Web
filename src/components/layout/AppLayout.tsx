import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("taskflow.sidebarOpen");

    return storedValue === null ? true : storedValue === "true";
  });

  useEffect(() => {
    localStorage.setItem("taskflow.sidebarOpen", isSidebarOpen.toString());
  }, [isSidebarOpen]);

  return (
    <>
      <Header title="TaskFlow" />

      <button
        type="button"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        aria-expanded={isSidebarOpen}
        aria-controls="app-sidebar"
      >
        {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      {isSidebarOpen && <Sidebar />}

      <MainContent>
        <Outlet />
      </MainContent>

      <footer>
        <p>Copyright © 2026 Ayal Laufer</p>
      </footer>
    </>
  );
}
