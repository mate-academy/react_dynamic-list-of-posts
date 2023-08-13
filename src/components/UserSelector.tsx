import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import { User } from '../types/User';

type Props = {
  users: User[];
  selectUser: (user: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = (
  {
    users,
    selectUser,
    selectedUser,
  },
) => {
  const [dropDownActive, setDropDownActive] = useState(false);

  const toggleDropdown = () => setDropDownActive(prev => !prev);
  const selectUserHandler = (user: User) => {
    selectUser(user);
    setDropDownActive(false);
  };

  const dropdown = useRef(null);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': dropDownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          ref={dropdown}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => selectUserHandler(user)}
              >
                {user.name}
              </a>
            ))
          }
        </div>
      </div>
    </div>
  );
};
