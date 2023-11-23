/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import cn from 'classnames';

import { User } from '../types/User';

interface Props {
  users: User[];
  activeUser: User | null;
  setActiveUser: React.Dispatch<React.SetStateAction<User | null>>;
  getUserPost: (userId: number) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  activeUser,
  setActiveUser,
  getUserPost,
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const selectUser = (user: User) => {
    setActiveUser(user);
    setIsSelectOpen(false);
    getUserPost(user.id);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isSelectOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          onBlur={() => setIsSelectOpen(false)}
        >
          <span>{activeUser ? activeUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              href={`user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === activeUser?.id,
              })}
              key={user.id}
              onMouseDown={() => selectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
