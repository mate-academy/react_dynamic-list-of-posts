import React from 'react';

type Props = {
  users: User[];
  currentUserId: number;
  selectUserId: (value: number) => void;
};

export const UserSelect: React.FC<Props> = ({
  users,
  currentUserId,
  selectUserId,
}) => (
  <label htmlFor="selectUser">
    Select a user: &nbsp;

    <select
      className="App__user-selector"
      id="selectUser"
      value={currentUserId}
      onChange={event => selectUserId(+event.target.value)}
    >
      <option value="0">All users</option>
      {users.map(user => (
        <option
          value={user.id}
          key={user.id}
        >
          {user.name}
        </option>
      ))}
    </select>
  </label>
);
