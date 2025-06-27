import React from 'react';
import { User } from '../types/User';
import cn from 'classnames';

interface Props {
  user: User;
  onSelectedUser: (user: User) => void;
  selectedPerson: User | null;
}

export const UserItem: React.FC<Props> = ({
  user,
  onSelectedUser,
  selectedPerson,
}) => {
  const isUserActive = selectedPerson?.id === user.id;

  function handleSelectedUser(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    onSelectedUser(user);
  }

  return (
    <a
      href={`#user-${user.id}`}
      className={cn('dropdown-item', { 'is-active': isUserActive })}
      onClick={handleSelectedUser}
    >
      {user.name}
    </a>
  );
};
