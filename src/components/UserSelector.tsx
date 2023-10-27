import React, { useContext, useState } from 'react';
import { UsersContext, UserContext } from './UserContext/UserContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const users = useContext(UsersContext);
  const [isOpen, setIsOpen] = useState(false);

  const { handleUserSelect, user } = useContext(UserContext);

  const handleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleUserId = (userId: User) => {
    handleUserSelect(userId);
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
          {user ? (
            <span>{user.name}</span>
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
            {(users?.map(item => (
              <a
                href={`#user-${item.id}`}
                className="dropdown-item"
                key={item.id}
                onClick={() => handleUserId(item)}
              >
                {item.name}
              </a>
            )))}
          </div>
        </div>
      )}
    </div>
  );
};
