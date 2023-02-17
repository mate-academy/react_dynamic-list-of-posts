import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types';
import { getUsers } from '../api';

type Props = {
  selectedUser: User | null,
  onSelect: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onSelect,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromServer = await getUsers();

        setUsers(usersFromServer);
        setHasLoaded(true);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleDropDown = useCallback(() => {
    setIsOpen(currIsOpen => !currIsOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined; // fix for eslint error
    }

    const closeDropdown = () => setIsOpen(false);

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isOpen]);

  const handleSelect = useCallback((user: User) => {
    setIsOpen(false);
    onSelect(user);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isOpen },
      )}
    >
      <div className="dropdown-trigger">

        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropDown}
        >
          <span>
            {isLoading && 'Loading...'}
            {hasError && 'Unable to load users'}
            {hasLoaded && (
              selectedUser ? selectedUser.name : 'Choose a user'
            )}
          </span>

          <span className="icon is-small">
            <i
              className={classNames('fas',
                {
                  'fa-angle-down': !isLoading,
                  'fa-spinner': isLoading,
                  'fa-exclamation-triangle': hasError,
                })}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { name, id } = user;
            const isSelected = user === selectedUser;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': isSelected },
                )}
                onClick={() => handleSelect(user)}
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
