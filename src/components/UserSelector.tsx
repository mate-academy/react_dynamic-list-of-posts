import React, { useCallback, useState } from 'react';
import { User } from '../types/User';

import classNames from 'classnames';

interface Props {
  usersList: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  usersList,
  selectedUser,
  onSelectUser,
}) => {
  const [showUsersList, setShowUsersList] = useState(false);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setShowUsersList(false);
    }
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': showUsersList && usersList.length > 0,
      })}
      onBlur={handleBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-expanded={showUsersList}
          aria-controls="dropdown-menu"
          onClick={() => {
            setShowUsersList(prev => !prev);
          }}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersList.map(user => (
            <a
              key={user.id}
              href={`#${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => {
                onSelectUser(user);
                setShowUsersList(false);
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
