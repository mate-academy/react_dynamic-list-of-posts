import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: User | null,
  setSelectedUser: (user: User) => void,
  // setPosts: (value: null) => void,
  getPosts: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  // setPosts,
  getPosts,
}) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleItemClick = (user: User) => {
    setSelectedUser(user);
    setIsListOpen(false);
    // setPosts(null);
    getPosts(user);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        {
          'is-active': isListOpen,
        },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsListOpen(!isListOpen)}
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
                {
                  'is-active': selectedUser?.id === user.id,
                },
              )}
              onClick={() => handleItemClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
