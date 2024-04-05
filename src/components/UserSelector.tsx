import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../Store';
import classNames from 'classnames';
import { UserItem } from './UserItem';

export const UserSelector: React.FC = () => {
  const { users, selectedUser } = useContext(StateContext);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownMenu = document.getElementById('dropdown-menu');

      if (dropdownMenu && !dropdownMenu.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenOnClick = () => setIsOpen(!isOpen);

  return (
    <div className="block">
      <div
        data-cy="UserSelector"
        className={classNames('dropdown', {
          'is-active': isOpen,
        })}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={handleOpenOnClick}
          >
            <span>{selectedUser?.name || 'Choose a user'}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <UserItem
                key={user.id}
                user={user}
                setIsOpen={setIsOpen}
                selectedUserId={selectedUser?.id || null}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
