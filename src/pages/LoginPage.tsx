import { useLocation, useNavigate } from "react-router";
import { LoginForm } from "../components/auth/LoginForm";
import { Section } from "../components/shared/Section";
import { routePaths } from "../routes/routePaths";
import type { AuthUser } from "../types/auth";
import type { LoginFormValues } from "../types/loginFormValues";

type LoginPageProps = {
  user: AuthUser | null;
  onLogin: (values: LoginFormValues) => boolean;
};

export function LoginPage({ user, onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

  function handleLogin(values: LoginFormValues): boolean {
    const success = onLogin(values);

    if (success) {
      const destination =
        from &&
        typeof from.pathname === "string" &&
        from.pathname.startsWith("/") &&
        !from.pathname.startsWith("//") &&
        from.pathname !== routePaths.login
          ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
          : routePaths.dashboard;

      navigate(destination, { replace: true });
    }

    return success;
  }

  return (
    <Section title="Login">
      {user ? (
        <p>
          Logged in as {user.name} ({user.role})
        </p>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </Section>
  );
}
