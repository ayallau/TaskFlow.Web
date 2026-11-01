import { NavLink } from "react-router";
import { routePaths } from "../../routes/routePaths";

export function Sidebar() {
  return (
    <aside id="app-sidebar">
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <NavLink
              to={routePaths.dashboard}
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to={routePaths.tasks}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Tasks
            </NavLink>
          </li>

          <li>
            <NavLink
              to={routePaths.users}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
