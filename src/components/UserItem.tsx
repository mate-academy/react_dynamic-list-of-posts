import React from 'react';
import { User } from '../types/User';

interface Props {
  user: User,
}

export const UserItem: React.FC<Props> = ({ user }) => {
  return (
    <a href="#user-1" className="dropdown-item">
      {user.name}
      {user.id}
    </a>
  )
};
