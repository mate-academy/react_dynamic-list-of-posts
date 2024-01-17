import React from 'react';
import cn from 'classnames';

import { User } from '../types/User';

interface Props {
  id: number,
  name: string,
  email: string,
  phone: string,
  selectedUserId?: number,
  onClick: (el: User) => void,
}

export const UserLink: React.FC<Props> = ({
  id,
  name,
  email,
  phone,
  selectedUserId,
  onClick,
}) => (
  <a
    href={`#user-${id}`}
    className={cn('dropdown-item',
      { 'is-active': id === selectedUserId })}
    onClick={() => onClick({
      id, name, email, phone,
    })}
  >
    {name}
  </a>
);
