import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  const [onClickList, setOnClickList] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest('[data-cy="UserSelector"]')) {
        setOnClickList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': onClickList })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOnClickList(!onClickList)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span
            className="icon is-small"
            onClick={() => setOnClickList(!onClickList)}
          >
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
              onClick={() => {
                onSelectUser(user);
                setOnClickList(false);
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
