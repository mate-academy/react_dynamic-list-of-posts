import React from 'react';
import { User } from '../types/User';
import { UserItem } from './UserItem';
import cn from 'classnames';

interface Props {
  users: User[];
  onSelectedUser: (user: User) => void;
  isVisible: boolean;
  selectedPerson: User | null;
}

export const UserList: React.FC<Props> = ({
  users,
  onSelectedUser,
  isVisible,
  selectedPerson,
}) => {
  return (
    <div
      className={cn('dropdown-menu', {
        'is-hidden': !isVisible,
      })}
      id="dropdown-menu"
      role="menu"
    >
      <div className="dropdown-content">
        {users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            onSelectedUser={onSelectedUser}
            selectedPerson={selectedPerson}
          />
        ))}
      </div>
    </div>
  );
};
