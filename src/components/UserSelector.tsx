import React, { useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  currentUser: User | null;
  onSetCurrentUser: (user: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  currentUser,
  onSetCurrentUser,
}) => {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  const handleBlur = () => {
    setTimeout(() => setIsActiveDropdown(false), 100);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isActiveDropdown,
      })}
      onBlur={handleBlur}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActiveDropdown(true)}
        >
          <span>{currentUser ? currentUser.name : 'Choose a user'}</span>

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
              className={cn('dropdown-item', {
                'is-active': currentUser?.id === user.id,
              })}
              key={user.id}
              onMouseDown={() => onSetCurrentUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
