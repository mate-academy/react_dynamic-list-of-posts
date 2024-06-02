import React, { useCallback, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUser: (user: User) => void;
  userSelected?: User;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  userSelected,
}) => {
  const [isUsersShown, setIsUsersShown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsUsersShown(false);
    }
  }, []);

  useEffect(() => {
    if (isUsersShown) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isUsersShown, handleOutsideClick]);

  const handleSelectionOfUser = useCallback(
    (user: User) => {
      setIsUsersShown(false);
      selectedUser(user);
    },
    [selectedUser],
  );

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isUsersShown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsUsersShown(!isUsersShown)}
        >
          {userSelected ? userSelected.name : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className={classNames('dropdown-menu', {
          'is-active': isUsersShown,
        })}
        id="dropdown-menu"
        role="menu"
        ref={dropdownRef}
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              className={classNames('dropdown-item', {
                'is-active': userSelected === user,
              })}
              href={`#user-${user.id}`}
              key={user.id}
              onClick={() => handleSelectionOfUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
