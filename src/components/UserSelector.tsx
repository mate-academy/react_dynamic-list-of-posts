import React, { useState } from 'react';
import cn from 'classnames';

import { User } from '../types/User';

interface Props {
  users: User[],
  selectedUser: User | null,
  updateSelectedUser: (el: User | null) => void,
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  updateSelectedUser,
}) => {
  const [isUserSelected, setIsUserSelected] = useState(false);

  const updateUserAndPosts = (currUser: User) => {
    updateSelectedUser(currUser);
    setIsUserSelected(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isUserSelected })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsUserSelected(!isUserSelected)}
        >
          {!selectedUser
            ? (
              <span>Choose a user</span>
            )
            : (
              <span>{selectedUser?.name}</span>
            )}

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
              className="dropdown-item"
              onClick={() => updateUserAndPosts(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
