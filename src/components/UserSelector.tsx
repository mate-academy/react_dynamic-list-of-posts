import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { UserItem } from './UserItem';

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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownVisible })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          onBlur={() => setIsDropdownVisible(false)}
        >
          {selectedUser
            ? <span>{selectedUser.name}</span>
            : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropdownVisible && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">

            {
              users.map(user => (
                <UserItem
                  user={user}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};
