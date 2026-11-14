import { Route, Routes } from "react-router";
import { DashboardPage } from "../pages/DashboardPage";
import { TasksPage } from "../pages/TasksPage";
import { UsersPage } from "../pages/UsersPage";
import { AboutPage } from "../pages/AboutPage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AppLayout } from "../components/layout/AppLayout";
import { routePaths } from "./routePaths";
import { TaskDetailsPage } from "../pages/TaskDetailsPage";
import { UserDetailsPage } from "../pages/UserDetailsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={routePaths.dashboard} element={<DashboardPage />} />
        <Route path={routePaths.tasks} element={<TasksPage />} />
        <Route path={routePaths.taskDetails} element={<TaskDetailsPage />} />
        <Route path={routePaths.users} element={<UsersPage />} />
        <Route path={routePaths.userDetails} element={<UserDetailsPage />} />
      </Route>

      <Route path={routePaths.about} element={<AboutPage />} />
      <Route path={routePaths.login} element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
