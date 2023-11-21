import React from 'react';
import classNames from 'classnames';
import { User as UserType } from '../types/User';

type Props = {
  user: UserType,
  selectUser: (userId: number) => void,
  idUserActive: number,
};

export const User: React.FC<Props> = ({ user, selectUser, idUserActive }) => {
  const { id, name } = user;

  return (
    <a
      href={`#user-${id}`}
      className={classNames('dropdown-item', {
        'is-active': idUserActive === id,
      })}
      onClick={() => selectUser(id)}
    >
      {name}
    </a>
  );
};
