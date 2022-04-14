import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  users: User[],
  onUserSelect: Dispatch<SetStateAction<number>>,
};

export const UserSelect: React.FC<Props> = ({
  users,
  // user,
  onUserSelect,
  // userId,
}) => {
  return (
    <label>
      Select a user: &nbsp;
      <select
        className="App__user-selector"
        onChange={(e) => {
          const id = +e.target.value;

          onUserSelect(id);
        }}
      >
        <option value={0}>All Users</option>
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
