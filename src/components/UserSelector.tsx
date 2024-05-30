import React, { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../types/User';

type UserSelectorProps = {
  users: User[];
  onUserSelect: Dispatch<SetStateAction<User | null>>;
  selectedUser: User | null;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  onUserSelect,
  selectedUser,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownActive(state => !state);
  };

  const handleUserSelect = (user: User) => {
    onUserSelect(user);
    setIsDropdownActive(false);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropdownActive && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={`dropdown-item ${user.id === selectedUser?.id ? 'is-active' : ''} `}
                onClick={() => handleUserSelect(user)}
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
