import React from 'react';
import classnames from 'classnames';
import { UserInt } from '../types/UserInt';

type UserProps = {
  user: UserInt,
  selectedUser: UserInt | undefined,
  handleSelectUser: (newUser: UserInt) => void,
};

export const User: React.FC<UserProps> = ({
  user,
  selectedUser,
  handleSelectUser,
}) => {
  return (
    <a
      href={`#user-${user.id}`}
      className={classnames('dropdown-item', {
        'is-active': selectedUser?.id === user.id,
      })}
      onClick={() => handleSelectUser(user)}
    >
      {user.name}
    </a>
  );
};
