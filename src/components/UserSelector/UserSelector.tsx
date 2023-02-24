import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { User } from '../../types/User';
import { getUsers } from '../../api/posts';

type Props = {
  selectedUserId: number;
  handleSelectUser: (userId: number) => void;
};
export const UserSelector: React.FC<Props> = React.memo(({
  selectedUserId,
  handleSelectUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoadingError, setIsUsersLoadingError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedUser = users.find(user => user.id === selectedUserId);

  const getUsersFromServer = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch (error) {
      setIsUsersLoadingError(true);
    }
  };

  useEffect(() => {
    getUsersFromServer();
  }, []);

  const handleClick = (userId: number) => {
    handleSelectUser(userId);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current
      && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsDropdownOpen(prevState => !prevState);
          }}
        >
          <span>
            {!selectedUser
              ? 'Choose a user'
              : selectedUser.name}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isUsersLoadingError
          ? (
            <div
              className="notification is-danger"
              data-cy="PostsLoadingError"
            >
              Something went wrong!
            </div>
          )
          : (
            <div className="dropdown-content">
              { users.map(user => (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  className={cn('dropdown-item',
                    { 'is-active': selectedUserId === user.id })}
                  onClick={() => {
                    handleClick(user.id);
                  }}
                >
                  {user.name}
                </a>
              ))}
            </div>
          )}
      </div>
    </div>
  );
});
