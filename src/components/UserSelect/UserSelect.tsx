import React from 'react';

type Props = {
  users: User[];
  selectUserId: (id: number) => void;
};

export const UserSelector: React.FC<Props> = ({ users, selectUserId }) => {
  return (
    <label htmlFor="select">
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        id="select"
        onChange={e => selectUserId(+e.target.value)}
      >
        <option value="0">All users</option>
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
};
