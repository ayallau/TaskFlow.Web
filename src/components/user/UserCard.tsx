import type { User } from "../../types/user";
import { Link } from "react-router";
import { routePaths } from "../../routes/routePaths";

type UserCardProps = User & {
  isAdmin: boolean;
  onPromoteUserTitle: (userId: string) => void;
};

export function UserCard({
  id,
  name,
  jobTitle,
  role,
  isActive,
  isAdmin,
  onPromoteUserTitle,
}: UserCardProps) {
  return (
    <article>
      <h3>{name}</h3>
      <p>ID: {id}</p>
      <p>Job Title: {jobTitle}</p>
      <p>Role: {role}</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>
      <Link to={`${routePaths.users}/${id}`}>View Details</Link>
      <p>
        {isAdmin && (
          <button type="button" onClick={() => onPromoteUserTitle(id)}>
            Promote User Title
          </button>
        )}
      </p>
    </article>
  );
}
