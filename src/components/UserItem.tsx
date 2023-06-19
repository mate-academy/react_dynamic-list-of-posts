import React from 'react';
import { User } from '../types/User';

type Props = {
  user: User,
  setIsOpened: (value: boolean) => void,
  setCurrentUser: (user: User) => void,
};

export const UserItem: React.FC<Props> = ({
  user,
  setIsOpened,
  setCurrentUser,
}) => {
  const { id, name } = user;

  const handleSelectUser = () => {
    setCurrentUser(user);
    setIsOpened(false);
  };

  return (
    <a
      href={`#user-${id}`}
      className="dropdown-item"
      onClick={handleSelectUser}
    >
      {name}
    </a>
  );
};
