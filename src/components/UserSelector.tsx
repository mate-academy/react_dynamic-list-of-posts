import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUserId: number | null;
  setSelectedUserId: (selectedUserId: number | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  setSelectedUserId,
}) => {
  const [usersDrop, setUsersDrop] = useState(false);
  const dropfownRef = useRef<HTMLDivElement>(null);

  const selectedUser = users.find(user => user.id === selectedUserId);

  const handleUsersSelect = (userId: number) => {
    setSelectedUserId(userId);
    setUsersDrop(false);
  };

  const handleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setUsersDrop(!usersDrop);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropfownRef.current &&
      !dropfownRef.current.contains(event.target as Node)
    ) {
      setUsersDrop(false);
    }
  };

  useEffect(() => {
    if (usersDrop) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [usersDrop]);

  return (
    <div
      ref={dropfownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': usersDrop })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
        >
          <span>
            {selectedUserId ? `${selectedUser?.name}` : 'Choose a user'}
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
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUserId,
              })}
              onClick={() => handleUsersSelect(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
