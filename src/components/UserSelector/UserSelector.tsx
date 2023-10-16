import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { User } from '../../types/User';
import { getUsers } from '../../services/users';

type Props = {
  isActive: boolean;
  setIsActive: (dataType: boolean) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  setErrorOccured: (error: string) => void;
};

export const UserSelector: React.FC<Props> = ({
  isActive,
  setIsActive,
  selectedUser,
  setSelectedUser,
  setErrorOccured,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const dropDownButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorOccured('Something went wrong!');
      });
  }, [setErrorOccured]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownButtonRef.current
        && !dropDownButtonRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setIsActive]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isActive,
      })}
      ref={dropDownButtonRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className="dropdown-item"
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
