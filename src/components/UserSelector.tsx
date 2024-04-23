import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../utils/api';
import classNames from 'classnames';

type Props = {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const [opened, setOpened] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleToggle = () => {
    setOpened(!opened);
  };

  const handleClose = () => {
    setOpened(false);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setOpened(false);
  };

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': opened })}
      onBlur={handleClose}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggle}
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
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              key={user.id}
              onMouseDown={event => {
                event.preventDefault();
                handleSelectUser(user);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
