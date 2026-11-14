import { LoginForm } from "../components/auth/LoginForm";
import { Section } from "../components/shared/Section";

export function LoginPage() {
  return (
    <Section title="Login">
      <LoginForm />
    </Section>
  );
}
