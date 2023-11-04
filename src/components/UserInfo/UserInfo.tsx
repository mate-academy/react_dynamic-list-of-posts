import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User,
  setSelectedUser: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => void;
};

export const UserInfo: React.FC<Props> = ({ user, setSelectedUser }) => {
  const { id, name } = user;

  return (
    <a href={`#user-${id}`} className="dropdown-item" onClick={(event) => setSelectedUser(event, user)}>
      {name}
    </a>
  );
};
