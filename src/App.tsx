import { useState } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import type { AuthUser } from "./types/auth";
import type { LoginFormValues } from "./types/loginFormValues";
import { authenticate } from "./services/authService";

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);

  function login(values: LoginFormValues): boolean {
    const authenticatedUser = authenticate(values);

    if (!authenticatedUser) {
      return false;
    }

    setUser(authenticatedUser);
    return true;
  }

  function logout(): void {
    setUser(null);
  }

  return <AppRoutes user={user} onLogin={login} onLogout={logout} />;
}

export default App;
