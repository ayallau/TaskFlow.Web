import { Navigate, Outlet, useLocation } from "react-router";
import type { AuthUser } from "../types/auth";
import { routePaths } from "./routePaths";

type ProtectedRouteProps = {
  user: AuthUser | null;
};

export function ProtectedRoute({ user }: ProtectedRouteProps) {
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to={routePaths.login} replace state={{ from: location }} />
    );
  }

  return <Outlet />;
}
