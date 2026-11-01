import { NavLink } from "react-router";

export function Sidebar() {
  return (
    <aside id="app-sidebar">
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <NavLink
              to="/"
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
              to="/tasks"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Tasks
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/users"
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
