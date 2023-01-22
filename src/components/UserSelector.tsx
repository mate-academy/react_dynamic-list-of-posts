import React, { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUserId: number;
  onSelectUserId: (userId: number) => void;
  onResetPostId: () => void;
};

export const UserSelector: FC<Props> = React.memo(
  ({
    users,
    selectedUserId,
    onSelectUserId,
    onResetPostId,
  }) => {
    const [isUsersListOpened, setIsUsersListOpened] = useState(false);

    useEffect(() => {
      if (!isUsersListOpened) {
        return;
      }

      const closeUsersList = () => setIsUsersListOpened(false);

      document.addEventListener('click', closeUsersList);

      // eslint-disable-next-line consistent-return
      return () => document.removeEventListener('click', closeUsersList);
    }, [isUsersListOpened]);

    const selectedUserName = users.find(
      user => user.id === selectedUserId,
    )?.name;

    const handleClickToggleUsersList = () => (
      setIsUsersListOpened(prev => !prev)
    );

    const handleClickSelectUser = (userId: number) => {
      onSelectUserId(userId);
      handleClickToggleUsersList();
      onResetPostId();
    };

    return (
      <div
        data-cy="UserSelector"
        className={cn(
          'dropdown',
          { 'is-active': isUsersListOpened },
        )}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={handleClickToggleUsersList}
          >
            <span>
              {selectedUserName || 'Choose a user'}
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
                href={`#user-${user.id}`}
                className={cn(
                  'dropdown-item',
                  { 'is-active': selectedUserId === user.id },
                )}
                key={user.id}
                onClick={() => handleClickSelectUser(user.id)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
