import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type ItemProps = {
  user: User;
  selectedUser: User | null;
  handleUserSelect: (user: User) => void;
};

export const DropDownItem: React.FC<ItemProps> = ({
  user,
  selectedUser,
  handleUserSelect,
}) => {
  const { id, name } = user;

  return (
    <a
      href={`#user-${id}`}
      className={classNames('dropdown-item', {
        'is- active': selectedUser === user,
      })}
      key={id}
      onClick={() => {
        handleUserSelect(user);
      }}
    >
      {name}
    </a>
  );
};
