import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { UserItem } from './UserItem';
import { useAppContext } from '../context/AppContext';

export const UserSelector: React.FC = () => {
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
  const { users, selectedUser } = useAppContext();

  const handleDropdown = () => {
    setIsDropdownActive(prev => !prev);
  };

  useEffect(() => {
    if (selectedUser) {
      handleDropdown();
    }
  }, [selectedUser]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
        >
          {
            selectedUser !== null
              ? <span>{selectedUser.name}</span>
              : <span>Choose a user</span>
          }

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {
            users.map(user => (
              <UserItem key={user.id} user={user} />
            ))
          }
        </div>
      </div>
    </div>
  );
};
