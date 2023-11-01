import React from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
};

export const Users: React.FC<Props> = ({ users }) => {
  return (
    <div className="dropdown-content">
      {users.map((user) => (
        <a
          href={`#user-${user.id}`}
          className="dropdown-item"
          key={user.id}
        >
          {user.name}
        </a>
      ))}
    </div>
  );
};
