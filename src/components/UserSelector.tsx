import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import * as service from '../api/service';

import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  onSelectUser: (userId: number) => void;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const UserSelector: React.FC<Props> = ({
  onSelectUser,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    service.getUsers()
      .then(usersFromServer => setUsers(usersFromServer))
      .catch(() => new Error());
  }, []);

  const handleClick = (user: User) => {
    setSelectedUser(user);

    if (selectedUser?.id !== user.id) {
      setSelectedPost(null);
      onSelectUser(user.id);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isOpenMenu,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          onBlur={() => setIsOpenMenu(false)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

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
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onMouseDown={() => handleClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
