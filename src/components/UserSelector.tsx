import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  onSelectUser: (userId: number) => void;
  selectedUserId: number | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onSelectUser,
  selectedUserId,
}) => {
  const [isDropdown, setIsDropDown] = useState(false);

  const toggleDropdown = () => {
    setIsDropDown(!isDropdown);
  };

  const handleClickOutside = () => {
    if (!selectedUserId) {
      setIsDropDown(false);
    }
  };

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
          onBlur={handleClickOutside}
        >
          <span>{selectedUserId ? selectedUser?.name : 'Choose a user'}</span>

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
              className={classNames('dropdown-item', {
                'is-active': selectedUserId === user.id,
              })}
              key={user.id}
              onMouseDown={() => {
                onSelectUser(user.id);
                setIsDropDown(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
