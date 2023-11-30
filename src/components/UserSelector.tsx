import React, { useState, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface T {
  users: User[],
  setSelectedUser: Dispatch<SetStateAction<null | User>>,
  selectedUser: User | null,
}

export const UserSelector: React.FC<T> = ({
  users,
  setSelectedUser,
  selectedUser,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const focused = () => {
    if (isFocused) {
      return setIsFocused(false);
    }

    return setIsFocused(true);
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
          onClick={focused}
          onBlur={() => setIsFocused(false)}
        >
          <span>{!selectedUser ? 'Choose a user' : selectedUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isFocused && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                key={user.id}
                onMouseDown={() => setSelectedUser(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
