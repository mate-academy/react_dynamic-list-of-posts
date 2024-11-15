import React, { useContext } from 'react';

import cn from 'classnames';
import { PostsContext } from '../../context/PostContext';

export const UserSelector: React.FC = () => {
  const {
    handleSelectUser,
    setUserMenuOpen,

    selectedUser,
    isUserMenuOpen,
    users,
  } = useContext(PostsContext);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setUserMenuOpen(!isUserMenuOpen)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isUserMenuOpen && (
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                key={user.id}
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
