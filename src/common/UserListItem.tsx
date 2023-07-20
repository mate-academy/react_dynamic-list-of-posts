import React from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  user: User;
  selected: boolean;
  onClick: (id: number) => void;
};

export const UserListItem: React.FC<Props> = ({ user, selected, onClick }) => (
  <a
    href={`#user-${user.id}`}
    className={classNames('dropdown-item', { 'is-active': selected })}
    onClick={() => onClick(user.id)}
  >
    {user.name}
  </a>
);
