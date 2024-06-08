import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  onSelect: (selectedUser: User) => void;
};

export const UserSelector: React.FC<Props> = ({ users, onSelect }) => {
  const [isDropDown, setIsDropDown] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropDown })}
      onMouseLeave={() => setIsDropDown(false)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsDropDown(!isDropDown);
          }}
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
              href={`#user-${user.id}`}
              className="dropdown-item"
              key={user.id}
              onClick={() => onSelect(user)}
            >
              {user.name}
            </a>
          ))}

          {/* <a href="#user-2" className="dropdown-item is-active">
            Ervin Howell
          </a> */}
        </div>
      </div>
    </div>
  );
};
