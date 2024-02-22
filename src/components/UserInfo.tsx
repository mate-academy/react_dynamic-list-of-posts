import React from 'react';
import cn from 'classnames';
import { User } from '../types';

type Props = {
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User;
  selectedUser: User | null;
};

export const UserInfo: React.FC<Props> = ({
  setSelectedUser,
  user,
  selectedUser,
}) => {
  const { id, name } = user;

  return (
    <a
      href={`#user-${id}`}
      className={cn('dropdown-item', { 'is-active': id === selectedUser?.id })}
      onMouseDown={() => setSelectedUser(user)}
    >
      {name}
    </a>
  );
};
