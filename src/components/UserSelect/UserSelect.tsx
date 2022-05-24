import React from 'react';

type Props = {
  users: User[];
  selectedUserId: number;
  changeUser: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setLoadPost: (value: boolean) => void;
};

export const UserSelect: React.FC<Props> = React.memo(({
  users,
  selectedUserId,
  changeUser,
  setLoadPost,
}) => {
  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        value={selectedUserId}
        onChange={(event) => {
          changeUser(event);
          setLoadPost(true);
        }}
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
});
