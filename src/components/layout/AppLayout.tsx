import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import { Section } from "../shared/Section";

type AppLayoutProps = {
  onLogout: () => void;
};

export function AppLayout({ onLogout }: AppLayoutProps) {
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
      <div>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
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
      <Section title="Links">
        <div>
          <Link to="/login">Go to Login Page</Link>
        </div>
      </Section>

      <footer>
        <p>Copyright © 2026 Ayal Laufer</p>
      </footer>
    </>
  );
}
