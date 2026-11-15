import { Navigate, Outlet } from "react-router";
import type { AuthUser } from "../types/auth";
import { routePaths } from "./routePaths";

type ProtectedRouteProps = {
  user: AuthUser | null;
};

export function ProtectedRoute({ user }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to={routePaths.login} replace />;
  }

  return <Outlet />;
}
