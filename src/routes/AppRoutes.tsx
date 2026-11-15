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
import type { AuthUser } from "../types/auth";
import type { LoginFormValues } from "../types/loginFormValues";
import { ProtectedRoute } from "./ProtectedRoute";

type AppRoutesProps = {
  user: AuthUser | null;
  onLogin: (values: LoginFormValues) => boolean;
  onLogout: () => void;
};

export function AppRoutes({ user, onLogin, onLogout }: AppRoutesProps) {
  return (
    <Routes>
      <Route element={<ProtectedRoute user={user} />}>
        <Route element={<AppLayout onLogout={onLogout} />}>
          <Route path={routePaths.dashboard} element={<DashboardPage />} />
          <Route path={routePaths.tasks} element={<TasksPage />} />
          <Route path={routePaths.taskDetails} element={<TaskDetailsPage />} />
          <Route path={routePaths.users} element={<UsersPage />} />
          <Route path={routePaths.userDetails} element={<UserDetailsPage />} />
        </Route>
      </Route>
      <Route path={routePaths.about} element={<AboutPage />} />
      <Route
        path={routePaths.login}
        element={<LoginPage user={user} onLogin={onLogin} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
