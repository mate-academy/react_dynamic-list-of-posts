import React from 'react';
import { User } from './Interfaces';

interface Props {
  user: User;
}

export const UserItem: React.FC<Props> = ({ user }) => (
  <div key={user.id} className="post__user">
    <span>{`${user.name} | `}</span>
    <span>{`${user.email} | `}</span>
    <span>
      {
        Object.values(user.address)
          .slice(0, Object.values(user.address).length - 2)
          .join(', ')
      }
    </span>
  </div>
);
