import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from './api/users';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  onSelectedUser: (val: User | null) => void;
  selectedUser: User | null;
  onSelectedPost: (val: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onSelectedUser,
  onSelectedPost,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSelectUser = (user: User) => {
    onSelectedPost(null);
    onSelectedUser(user);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(true)}
          onBlur={() => setIsDropdownActive(false)}
        >
          <span>{!selectedUser ? 'Choose a user' : selectedUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={'#user-' + user.id}
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onMouseDown={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
