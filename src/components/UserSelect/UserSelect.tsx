import React from 'react';
import { User } from '../../Types/User';

type Props = {
  users: User[];
  selectedUser: number;
  selectedUserId: (id: number) => void;
};

export const UserSelect: React.FC<Props> = ({
  users,
  selectedUser,
  selectedUserId,
}) => (
  <label>
    Select a user: &nbsp;

    <select
      className="App__user-selector"
      value={selectedUser}
      onChange={(event) => selectedUserId(+event.target.value)}
    >
      <option value="0">All users</option>
      {users.map(user => (
        <option value={user.id}>{user.name}</option>
      ))}
    </select>
  </label>
);
