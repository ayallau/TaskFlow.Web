// Controlled Component

type TaskSearchProps = {
  searchTerm: string;
  onSearchChange: (text: string) => void;
};

export function TaskSearch({ searchTerm, onSearchChange }: TaskSearchProps) {
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.currentTarget.value);
  }

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search tasks"
    />
  );
}
