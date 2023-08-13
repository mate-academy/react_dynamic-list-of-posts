import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  onUserSelect: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({ users, onUserSelect }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState('Choose a user');
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickDrop = (event: MouseEvent) => {
      const target = event.target as HTMLSelectElement;

      if (!dropdown.current?.contains(target)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener('click', handleClickDrop);

    return () => {
      document.removeEventListener('click', handleClickDrop);
    };
  }, []);

  const handleOpenDrop = useCallback(() => {
    setIsDropdown(prevState => !prevState);
  }, []);

  const handleSelectUser = useCallback((user: User) => {
    onUserSelect(user);
    setCurrentUser(user.name);
    setIsDropdown(false);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdown}
      className={classNames(
        'dropdown',
        { 'is-active': isDropdown },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenDrop}
        >
          <span>
            {currentUser}
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
              className={classNames('dropdown-item', {
                'is-active': currentUser === user.name,
              })}
              key={user.id}
              onClick={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
