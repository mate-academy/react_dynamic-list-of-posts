import classNames from 'classnames';
import React from 'react';

type Props = {
  name: string;
  id: number;
  selectedUser: number | null;
  handleUserClick: (id: number) => void;
};

export const UserLink: React.FC<Props> = ({
  name,
  id,
  handleUserClick,
  selectedUser,
}) => {
  return (
    <a
      href={`#user-${id}`}
      className={classNames('dropdown-item', {
        'is-active': id === selectedUser,
      })}
      onClick={() => handleUserClick(id)}
    >
      {name}
    </a>
  );
};
