import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import './UserSelector.scss';

type Props = {
  users: User[];
};

export const UserSelector: React.FC<Props> = ({ users }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': showDropdown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button dropdown-button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href="#user-1"
              className="dropdown-item"
              key={user.id}
            >
              {user.name}
            </a>
          ))}
          {/* <a href="#user-2" className="dropdown-item is-active">Ervin Howell</a> */}
        </div>
      </div>
    </div>
  );
};
