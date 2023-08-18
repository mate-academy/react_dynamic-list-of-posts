import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[]
  selectUser: User | null
  setSelectUser: (selectUser: User | null) => void
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectUser,
  setSelectUser,
}) => {
  const [isActive, setIsActive] = useState(false);
  const hanlderMenuUsers = () => {
    setIsActive(true);
  };

  useEffect(() => {
    const closeMenu = () => {
      setIsActive(false);
    };

    if (isActive) {
      window.addEventListener('click', closeMenu);
    } else {
      window.removeEventListener('click', closeMenu);
    }

    return () => {
      window.removeEventListener('click', closeMenu);
    };
  });

  const handleSelectUser = (user : User) => {
    setSelectUser(user);
  };

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
          onClick={hanlderMenuUsers}
        >
          <span>
            {selectUser ? (
              selectUser.name
            ) : (
              'Choose a user'
            )}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {users.map(user => (
          <div key={user.id} className="dropdown-content">
            <a
              href={`#user-${user.id}`}
              className={cn('dropdown-item',
                { 'is-active': selectUser === user })}
              onClick={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
