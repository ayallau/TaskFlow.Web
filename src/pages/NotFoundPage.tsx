import { Link } from "react-router";
import { routePaths } from "../routes/routePaths";

export function NotFoundPage() {
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <p>The requested page does not exist.</p>
      <Link to={routePaths.dashboard}>Back to Dashboard</Link>
    </section>
  );
}
