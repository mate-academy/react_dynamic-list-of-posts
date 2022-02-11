type Props = {
  users: User[];
  onSelectUserId: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedUserId: number;
};

export const UserSelect: React.FC<Props> = ({
  users,
  onSelectUserId,
  selectedUserId,
}) => {
  return (
    <label htmlFor="user-select">
      Select a user: &nbsp;
      <select
        id="user-select"
        className="App__user-selector"
        value={selectedUserId}
        onChange={(event) => {
          onSelectUserId(event);
        }}
      >
        <option value={0}>All users</option>
        {users.map((user, i) => (
          <option key={user.id} value={i + 1}>{user.name}</option>
        ))}
      </select>

    </label>

  );
};
