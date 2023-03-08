import React, { useState } from 'react';

import { User } from '../types/User';

type Props = {
  users: User[],
  selectUserId: (value: number) => void,
};

export const UserSelector: React.FC<Props> = React.memo(
  ({ users, selectUserId }) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const dropDownChange = () => {
      setIsDropDownOpen(!isDropDownOpen);
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
            onClick={dropDownChange}
          >
            <span>Choose a user</span>

            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>

        {isDropDownOpen && (
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {users.map((user) => (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  className="dropdown-item"
                  onClick={() => {
                    selectUserId(user.id);
                    setIsDropDownOpen(false);
                  }}
                >
                  {user.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);
