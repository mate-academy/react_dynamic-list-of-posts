import React, { useEffect, useState } from 'react';
import cl from 'classnames';
import { getUsers } from '../api/users';
import { User } from '../types/User';
import { Loader } from './Loader';

type Props = {
  currentUser: User | null;
  setCurrentUser: (u: User) => void;
  hasError: boolean;
  setHasError: (h: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({
  currentUser,
  setCurrentUser,
  hasError,
  setHasError,
}) => {
  const [users, setUsers] = useState<User[]>();
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id: currentUserId, name: currentUserName } = currentUser || {};

  useEffect(() => {
    setIsLoading(true);

    getUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []); // eslint-disable-line

  const selectUser = (user: User) => {
    setCurrentUser(user);
    setIsFocusDropdown(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (e.relatedTarget?.className === 'dropdown-item') {
      return;
    }

    setIsFocusDropdown(false);
  };

  const handleClick = () => {
    setIsFocusDropdown(!isFocusDropdown);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cl('dropdown', { 'is-active': isFocusDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClick}
          onBlur={handleBlur}
        >
          <span>{currentUser ? currentUserName : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {isLoading && <Loader />}

          {!hasError &&
            !isLoading &&
            users &&
            users?.map(user => (
              <a
                href={`#user-${user.id}`}
                className={cl('dropdown-item', {
                  'is-active': user.id === currentUserId,
                })}
                onClick={() => selectUser(user)}
                key={user.id}
              >
                {user.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
