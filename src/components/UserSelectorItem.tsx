import React from 'react';
import { User } from '../types/User';
import { useValues } from '../SharedContext';
import cn from 'classnames';

type Props = {
  user: User;
  setIsActiveUserSelector: (status: boolean) => void;
};

export const UserSelectorItem: React.FC<Props> = ({
  user,
  setIsActiveUserSelector,
}) => {
  const { id, name } = user;
  const { selectedUser, handleSelectUser } = useValues();

  const handleSubmitSelectUser = () => {
    handleSelectUser(id);
    setIsActiveUserSelector(false);
  };

  const handleMouseDownClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return (
    <a
      href={`#user-${id}`}
      className={cn('dropdown-item', {
        'is-active': selectedUser?.id === id,
      })}
      onClick={handleSubmitSelectUser}
      onMouseDown={handleMouseDownClick}
    >
      {name}
    </a>
  );
};
