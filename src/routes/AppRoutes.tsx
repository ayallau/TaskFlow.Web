import { Route, Routes } from "react-router";
import { DashboardPage } from "../pages/DashboardPage";
import { TasksPage } from "../components/TasksPage";
import { UsersPage } from "../pages/UsersPage";
import { AboutPage } from "../pages/AboutPage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AppLayout } from "../components/layout/AppLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>

      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
