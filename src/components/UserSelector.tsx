import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  setSelectedUser: (user: User) => void;
  users: User[];
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  setSelectedUser,
  users,
  selectedUser,
}) => {
  const [isActive, setIsActive] = useState(false);
  const text = selectedUser ? selectedUser.name : 'Choose a user';

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onBlur={() => setIsActive(false)}
          onClick={() => setIsActive(prev => !prev)}
        >
          <span>{text}</span>

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
                'is-active': user.id === selectedUser?.id,
              })}
              onMouseDown={() => setSelectedUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
