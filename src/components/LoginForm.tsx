import { useState } from "react";
import type { SubmitEvent } from "react";
import type { LoginFormValues } from "../types/loginFormValues";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const values: LoginFormValues = {
      email,
      password,
    };

    console.log("Email:", values.email);
    console.log("Password:", "***");

    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>

        <input
          type="email"
          id="email"
          name="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
