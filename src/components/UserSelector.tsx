import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsDropDown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropDown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropDown}
        >
          {!selectedUser ? (
            <span>Choose a user</span>
          ) : (
            <span>
              {selectedUser.name}
            </span>
          )}

          <span className="icon is-small">
            <i
              className="fas fa-angle-down"
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users
            .map(user => (
              <a
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
