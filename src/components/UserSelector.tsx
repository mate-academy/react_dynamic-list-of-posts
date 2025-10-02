import React, { useState } from 'react';
import { User } from '../types/User';
import cls from 'classnames';

type Props = {
  users: User[];
  userId?: number | null;
  setUserId: (id: number) => void;
};

export const UserSelector: React.FC<Props> = ({ users, userId, setUserId }) => {
  const [isFocused, setIsFocused] = useState(false);

  const selectedUser = users.find(u => u.id === userId) || null;

  return (
    <div
      data-cy="UserSelector"
      className={cls('dropdown', {
        'is-active': isFocused,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsFocused(!isFocused)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
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
              key={user.id}
              href={`#user-${user.id}`}
              className={cls('dropdown-item', {
                'is-active': userId === user.id,
              })}
              data-cy="UserItem"
              onClick={event => {
                event.preventDefault();
                setIsFocused(false);
                setUserId(user.id);
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
