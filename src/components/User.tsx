import React from 'react';
import classNames from 'classnames';
import { User as UserType } from '../types/User';

type Props = {
  user: UserType,
  selectUser: (userId: number) => void,
  idUserActive: number,
};

export const User: React.FC<Props> = ({ user, selectUser, idUserActive }) => {
  return (
    <a
      href={`#user-${user.id}`}
      className={classNames('dropdown-item', {
        'is-active': idUserActive === user.id,
      })}
      onClick={() => selectUser(user.id)}
    >
      {user.name}
    </a>
  );
};
