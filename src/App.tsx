import { useState } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import type { AuthUser } from "./types/auth";
import type { LoginFormValues } from "./types/loginFormValues";

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);

  function login(values: LoginFormValues): boolean {
    if (values.email !== "admin@example.com" || values.password !== "demo123") {
      return false;
    }

    setUser({
      id: "1",
      name: "Admin",
      role: "admin",
    });

    return true;
  }

  function logout(): void {
    setUser(null);
  }

  return <AppRoutes user={user} onLogin={login} onLogout={logout} />;
}

export default App;
