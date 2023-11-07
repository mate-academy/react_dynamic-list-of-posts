import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  userSelector(user: User): void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  userSelector,
  users,
  selectedUser,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={cn(
        'dropdown',
        { 'is-active': isActive },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(prev => !prev)}
          onBlur={() => setIsActive(false)}
        >
          <span>
            {selectedUser
              ? `${selectedUser.name}`
              : 'Choose a user'}
          </span>

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
              href={String(user.id)}
              className={cn(
                'dropdown-item',
                { 'is-active': user.id === selectedUser?.id },
              )}
              onMouseDown={() => userSelector(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
