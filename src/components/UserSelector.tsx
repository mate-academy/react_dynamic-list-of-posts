import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/user';
import { useSelectedUser } from './Contexts/UserContext';

export const UserSelector: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { selectedUser, setSelectedUser } = useSelectedUser();
  const [isDropDownActive, setIsDropDownActive] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setAllUsers)
      // eslint-disable-next-line no-console
      .catch(console.info);
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsDropDownActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropDownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropDownActive(!isDropDownActive)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {allUsers.map((user) => (
            <a
              href={`#user-${user.id}`}
              className="dropdown-item"
              onClick={() => handleSelectUser(user)}
              key={user.id}
            >
              {user.name}
            </a>

          ))}
        </div>
      </div>
    </div>
  );
};
