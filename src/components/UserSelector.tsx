import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api';

interface Props {
  selectedUser: User | null;
  selectUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = React.memo(({
  selectedUser,
  selectUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (!isOpened) {
      return;
    }

    const closeUserSelector = () => {
      setIsOpened(false);
    };

    document.addEventListener('click', closeUserSelector);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', closeUserSelector);
    };
  }, [isOpened]);

  const handleDropdownPopupOnClick = () => {
    setIsOpened(currentStatus => !currentStatus);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isOpened,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownPopupOnClick}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => selectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
