import React from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  isListOpen: boolean,
  setIsListOpen: (value: boolean) => void,
  users: User[],
  selectedUser: User | null,
  setSelectedUser: (user: User) => void,
  getPosts: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  isListOpen,
  setIsListOpen,
  users,
  selectedUser,
  setSelectedUser,
  getPosts,
}) => {
  const handleListOpening = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsListOpen(!isListOpen);
  };

  const handleItemClick = (user: User) => {
    setSelectedUser(user);
    setIsListOpen(false);
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
          onClick={handleListOpening}
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
