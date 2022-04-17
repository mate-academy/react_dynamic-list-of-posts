import React from 'react';
import { User } from '../../types';

interface Props {
  users: User[];
  selectedUserId: number;
  changeUser: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const UserSelect: React.FC<Props> = React.memo(({
  users, selectedUserId, changeUser,
}) => {
  return (
    <label>
      Select a user: &nbsp;

      <select
        className="App__user-selector"
        value={selectedUserId}
        onChange={changeUser}
      >
        <option value="0">All users</option>
        {users.map(({ id, name }) => (
          <option value={id} key={id}>{name}</option>
        ))}
      </select>
    </label>
  );
});
