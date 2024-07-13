import React from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type UserLinkProps = {
  user: User;
  userId: number | null;
  onSelectUser: (userId: number) => void;
};

export const UserLink: React.FC<UserLinkProps> = ({
  user,
  userId,
  onSelectUser,
}) => {
  const { id, name } = user;

  return (
    <a
      href={`#user-${id}`}
      className={cn('dropdown-item', {
        'is-active': id === userId,
      })}
      onClick={() => onSelectUser(user.id)}
    >
      {name}
    </a>
  );
};
