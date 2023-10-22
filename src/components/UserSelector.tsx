import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { UsersContext } from '../UsersContext';
import { PostsContext } from '../PostsContext';

export const UserSelector: React.FC = () => {
  const { usersFromServer } = useContext(UsersContext);
  const { selectedUser, setSelectedUser } = useContext(PostsContext);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isButtonActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsButtonActive(v => !v)}
          onBlur={() => setIsButtonActive(false)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersFromServer.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onMouseDown={() => {
                setSelectedUser(user);
                setIsButtonActive(false);
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
