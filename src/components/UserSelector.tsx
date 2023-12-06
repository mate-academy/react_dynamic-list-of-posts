import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../GlobalContetxt';
import { UserDetails } from './UserDetails';

export const UserSelector: React.FC = () => {
  const {
    users,
    userName,
  } = useContext(GlobalContext);
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isActiveDropdown },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActiveDropdown(!isActiveDropdown)}
        >
          <span>
            {userName}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <UserDetails
              user={user}
              key={user.id}
              setIsActiveDropdown={setIsActiveDropdown}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
