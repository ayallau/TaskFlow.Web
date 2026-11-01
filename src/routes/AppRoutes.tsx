import { Route, Routes } from "react-router";
import { DashboardPage } from "../pages/DashboardPage";
import { TasksPage } from "../components/TasksPage";
import { UsersPage } from "../pages/UsersPage";
import { AboutPage } from "../pages/AboutPage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AppLayout } from "../components/layout/AppLayout";
import { routePaths } from "./routePaths";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={routePaths.dashboard} element={<DashboardPage />} />
        <Route path={routePaths.tasks} element={<TasksPage />} />
        <Route path={routePaths.users} element={<UsersPage />} />
      </Route>

      <Route path={routePaths.about} element={<AboutPage />} />
      <Route path={routePaths.login} element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
