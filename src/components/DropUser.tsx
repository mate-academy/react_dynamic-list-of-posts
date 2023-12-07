import React from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  user: User,
  isActive: boolean,
  chooseUser: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, user: User
  ) => void
};

export const DropUser: React.FC<Props> = ({
  user,
  isActive,
  chooseUser,
}) => {
  const { id, name } = user;

  return (
    <a
      href={`#user-${id}`}
      className={classNames('dropdown-item', {
        'is-active': isActive,
      })}
      key={id}
      onClick={event => chooseUser(event, user)}
    >
      {`${name}`}
    </a>
  );
};
