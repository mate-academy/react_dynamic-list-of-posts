import React from 'react';
import cn from 'classnames';

import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  handleSelectedUser: (user: User) => void;
};

export const DropdownMenu: React.FC<Props> = ({
  users,
  selectedUser,
  handleSelectedUser,
}) => (
  <div className="dropdown-menu" id="dropdown-menu" role="menu">
    <div className="dropdown-content">
      {users.map(user => (
        <a
          key={user.id}
          href={`#user-${user.id}`}
          className={cn('dropdown-item', {
            'is-active': selectedUser?.id === user.id,
          })}
          onClick={() => handleSelectedUser(user)}
        >
          {user.name}
        </a>
      ))}
    </div>
  </div>
);
