import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  onSelect: (user: User) => void;
  selectedUser: User | null;
  fetchPosts: (userId: number) => void;
  usersIsLoaded: boolean;
};

export const UserSelector: React.FC<Props> = (
  {
    users, onSelect, selectedUser, fetchPosts, usersIsLoaded,
  },
) => {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': showUsers },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowUsers(currentValue => !currentValue)}
          disabled={!usersIsLoaded}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
              className={classNames(
                'dropdown-item',
                { 'is-active': selectedUser === user },
              )}
              onClick={() => {
                onSelect(user);
                fetchPosts(user.id);
                setShowUsers(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
