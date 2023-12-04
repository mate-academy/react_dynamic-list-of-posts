import React, { useContext, useState } from 'react';
import { UsersContext } from '../store/UsersContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const { users, selectedUser, setSelectedUser } = useContext(UsersContext);
  const [usersBeShown, shouldUsersBeShown] = useState(false);

  const handleClick = (user: User) => {
    setSelectedUser(user);
    shouldUsersBeShown(false);
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
          onClick={() => shouldUsersBeShown(!usersBeShown)}
        >
          <span>{selectedUser ? (selectedUser.name) : ('Choose a user')}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {usersBeShown && (
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => handleClick(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
