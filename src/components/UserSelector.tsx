import React, { useContext, useState } from 'react';
import { User } from '../types/User';
import { AppContext } from '../context/ContextProvider';

export const UserSelector: React.FC = () => {
  const { users, setSelectedUser } = useContext(AppContext);
  const [dropdownSelector, setDropdownSelector] = useState(false);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setDropdownSelector(false);
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
          onClick={() => setDropdownSelector(!dropdownSelector)}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {dropdownSelector && (
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => handleSelectUser(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        )}
        {/* <a href="#user-2" className="dropdown-item is-active">Ervin Howell</a> */}
      </div>
    </div>
  );
};
