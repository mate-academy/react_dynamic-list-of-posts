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
  const [isPressed, setIsPressed] = useState(false);

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setIsPressed(false);
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
          onClick={() => setIsPressed(prevValue => !prevValue)}
        >
          {selectedUser ? <span>{selectedUser.name}</span>
            : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isPressed && (
        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
          <div className="dropdown-content">
            {users.map(({
              id,
              name,
              email,
              phone,
            }) => (
              <a
                href={`#user-${id}`}
                onClick={() => handleSelect({
                  id,
                  name,
                  email,
                  phone,
                })}
                key={id}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUser?.id === id },
                )}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
