import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  setSelectedUser,
  selectedUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleDropdownBlur = (
    event: React.FocusEvent<HTMLButtonElement, Element>,
  ) => {
    if (event.relatedTarget?.className !== 'dropdown-item') {
      setIsOpen(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onBlur={handleDropdownBlur}
          onClick={toggleDropdown}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser && selectedUser.id === user.id,
              })}
              onClick={() => handleSelectUser(user)}
              onBlur={() => setIsOpen(false)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
