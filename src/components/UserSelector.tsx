import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface Props {
  users: User[];
  handleUserSelect: (user: User) => void;
  selectedUser: User | null;
}

export const UserSelector: React.FC<Props> = ({
  users,
  handleUserSelect,
  selectedUser,
}) => {
  const [listOpened, setListOpened] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleOpenListButtonClick = useCallback(() => {
    setListOpened(true);
  }, []);

  const handleUsersOptionClick = useCallback((user: User) => {
    setListOpened(false);
    handleUserSelect(user);
  }, [handleUserSelect]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setListOpened(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': listOpened })}
      ref={ref}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenListButtonClick}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser === user,
                })}
                onClick={() => handleUsersOptionClick(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
