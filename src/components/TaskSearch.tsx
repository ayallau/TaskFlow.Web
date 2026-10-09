type TaskSearchProps = {
  searchTerm: string;
  onTextInput: (text: string) => void;
};

export function TaskSearch({ searchTerm, onTextInput }: TaskSearchProps) {
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    onTextInput(event.currentTarget.value);
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
