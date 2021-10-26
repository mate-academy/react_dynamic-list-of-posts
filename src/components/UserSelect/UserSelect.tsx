import React from 'react';

type Props = {
  users: User[];
  selectedUserId: string;
  onUserChange: (value: string) => void;
};

export const UserSelect: React.FC<Props> = ({
  users,
  selectedUserId,
  onUserChange,
}) => (
  <label htmlFor="userSelect">
    Select a user: &nbsp;

    <select
      id="userSelect"
      value={selectedUserId}
      className="App__user-selector"
      onChange={(e) => onUserChange(e.currentTarget.value)}
    >
      <option value="">All users</option>
      {users.map(user => (
        <option
          key={user.id}
          value={user.id}
        >
          {user.name}
        </option>
      ))}
    </select>
  </label>
);
