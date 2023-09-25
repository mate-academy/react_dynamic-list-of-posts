import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: User | null,
  handleSelectedUser: (id: number) => void,
};

export const UserSelector: React.FC<Props> = (
  { users, handleSelectedUser, selectedUser },
) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleClick = (id: number) => {
    handleSelectedUser(id);
    setIsVisible(false);
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
          onClick={handleDropdown}
        >
          {selectedUser === null
            ? <span>Choose a user</span>
            : <span>{selectedUser.name}</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isVisible && (
        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                key={user.id}
                onClick={() => handleClick(user.id)}
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
