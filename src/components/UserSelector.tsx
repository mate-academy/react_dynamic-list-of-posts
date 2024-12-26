import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import * as usersService from '../api/users';

import { User } from '../types/User';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  setIsError: (error: boolean) => void;
  getPostsByUser: (userId: number) => void;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  setUserPosts: Dispatch<SetStateAction<Post[]>>;
  activeUser: User | null;
  setActiveUser: Dispatch<SetStateAction<User | null>>;
};
export const UserSelector: React.FC<Props> = props => {
  const {
    setIsError,
    getPostsByUser,
    isActive,
    setIsActive,
    setUserPosts,
    activeUser,
    setActiveUser,
  } = props;

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    usersService
      .getUsers()
      .then(setUsers)
      .catch(() => setIsError(true));
  }, [setIsError]);

  useEffect(() => {
    setIsActive(false);
  }, [setIsActive]);

  const handleClickOnUser = (user: User) => {
    setUserPosts([]);
    setActiveUser(user);
    getPostsByUser(user.id);
    setIsActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          onClick={event => {
            event.stopPropagation();
            setIsActive(!isActive);
          }}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{activeUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': activeUser?.id === user.id,
              })}
              onClick={() => handleClickOnUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
