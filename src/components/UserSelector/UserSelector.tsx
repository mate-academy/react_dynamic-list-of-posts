import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { User } from '../../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (newUser: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onUserSelect,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = ({ target }: MouseEvent) => {
      if (
        target instanceof Node
        && dropdownElement.current
        && !dropdownElement.current.contains(target)
        && isOpened
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [isOpened]);

  const handleMenuClick = () => setIsOpened(!isOpened);

  const handleUserSelect = (newUser: User) => {
    onUserSelect(newUser);
    setIsOpened(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        {
          'is-active': isOpened,
        },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleMenuClick}
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

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        ref={dropdownElement}
      >
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                {
                  'is-active': user.id === selectedUser?.id,
                },
              )}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
