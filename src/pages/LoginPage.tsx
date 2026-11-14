import { LoginForm } from "../components/auth/LoginForm";
import { Section } from "../components/shared/Section";
import type { AuthUser } from "../types/auth";
import type { LoginFormValues } from "../types/loginFormValues";

type LoginPageProps = {
  user: AuthUser | null;
  onLogin: (values: LoginFormValues) => boolean;
};

export function LoginPage({ user, onLogin }: LoginPageProps) {
  return (
    <Section title="Login">
      {user ? (
        <p>
          Logged in as {user.name} ({user.role})
        </p>
      ) : (
        <LoginForm onLogin={onLogin} />
      )}
    </Section>
  );
}
