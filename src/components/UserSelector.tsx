import React, { useContext, useState } from 'react';
import { UserContext, UserIdContext } from './UserContext/UserContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const users = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const userIdContext = useContext(UserIdContext);

  const handleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleUserId
    = (userId: User) => {
      userIdContext.handleUserSelect(userId);
      handleMenu();
    };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleMenu}
        >
          {userIdContext.userId ? (
            <span>{userIdContext.userId.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {(users?.map(user => (
              <a
                href={`#user-${user.id}`}
                className="dropdown-item"
                key={user.id}
                onClick={() => handleUserId(user)}
              >
                {user.name}
              </a>
            )))}
          </div>
        </div>
      )}
    </div>
  );
};
