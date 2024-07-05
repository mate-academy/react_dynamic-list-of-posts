import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { HandleUserSelectorItemClick } from '../types/handlers';

type Props = {
  user: User;
  isSelected: boolean;
  onUserSelectorItemClick: HandleUserSelectorItemClick;
};

export const UserSelectorItem: React.FC<Props> = ({
  user,
  isSelected,
  onUserSelectorItemClick,
}) => {
  const { id, name } = user;

  const handleClick = () => onUserSelectorItemClick(id);

  const handleMouseDown = (event: React.MouseEvent<HTMLAnchorElement>) =>
    event.preventDefault();

  return (
    <a
      href={`#user-${id}`}
      className={classNames('dropdown-item', { 'is-active': isSelected })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {name}
    </a>
  );
};
