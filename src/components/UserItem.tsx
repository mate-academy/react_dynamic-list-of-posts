import React from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  user: User;
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

export const UserItem: React.FC<Props> = ({
  user,
  selectedUser,
  setSelectedUser,
}) => {
  return (
    <a
      key={user.id}
      href={`#user-${user.id}`}
      className={cn(
        'dropdown-item',
        { 'is-active': selectedUser?.id === user.id },
      )}
      onMouseDown={() => setSelectedUser(user)}
    >
      {user.name}
    </a>
  );
};
