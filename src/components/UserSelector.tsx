import React, { useState } from 'react';
import { useValues } from '../SharedContext';
import cn from 'classnames';
import { UserSelectorItem } from './UserSelectorItem';

export const UserSelector: React.FC = () => {
  const { users, selectedUser } = useValues();
  const [isActiveUserSelector, setIsActiveUserSelector] = useState(false);

  const handleToggleDropDown = () => {
    setIsActiveUserSelector(!isActiveUserSelector);
  };

  const handleCloseOpenMenu = () => {
    setIsActiveUserSelector(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isActiveUserSelector === true,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleDropDown}
          onBlur={handleCloseOpenMenu}
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
            <UserSelectorItem
              user={user}
              key={user.id}
              setIsActiveUserSelector={setIsActiveUserSelector}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
