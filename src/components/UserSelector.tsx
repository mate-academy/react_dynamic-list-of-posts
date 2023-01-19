import React, { useState, useEffect, memo } from 'react';
import cn from 'classnames';

import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | undefined;
  onUserSelect: React.Dispatch<React.SetStateAction<number | null>>;
};

export const UserSelector: React.FC<Props> = memo((props) => {
  const {
    users,
    selectedUser,
    onUserSelect,
  } = props;

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  useEffect(() => {
    if (!isDropdownOpened) {
      return;
    }

    const handleDocumentClick = () => {
      setIsDropdownOpened(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isDropdownOpened]);

  return (
    <div
      data-cy="UserSelector"
      className={cn(
        'dropdown',
        { 'is-active': isDropdownOpened },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsDropdownOpened(status => !status);
          }}
        >
          <span>
            {selectedUser
              ? selectedUser.name
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
              href={`#user-${user.id}`}
              className={cn(
                'dropdown-item',
                { 'is-active': selectedUser?.id === user.id },
              )}
              onClick={() => {
                onUserSelect(user.id);
                setIsDropdownOpened(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
