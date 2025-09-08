import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../services/users';
import classNames from 'classnames';

type Props = {
  handleUserIdChange: (userId: number) => void;
  handlePostIdChange: (postId: number | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  handleUserIdChange,
  handlePostIdChange,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showDropdown, setShowDropDown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSelectChange = (user: User) => {
    handleUserIdChange(user.id);
    setSelectedUser(user);
    setShowDropDown(false);
    handlePostIdChange(null);
  };

  return (
    <div
      data-cy="UserSelector"
      tabIndex={0}
      onFocus={() => setShowDropDown(true)}
      onBlur={() => setShowDropDown(false)}
      className={classNames('dropdown', { 'is-active': showDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <button
              onMouseDown={() => handleSelectChange(user)}
              key={user.id}
              className="dropdown-item"
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
