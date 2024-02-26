import React, { useEffect, useState } from 'react';
import cl from 'classnames';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type Props = {
  currentUser: User | null;
  setCurrentUser: (u: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  currentUser,
  setCurrentUser,
}) => {
  const [users, setUsers] = useState<User[]>();
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer);
      })
      .catch()
      .finally();
  }, []);

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
          onClick={() => setIsFocusDropdown(!isFocusDropdown)}
          onBlur={handleBlur}
        >
          <span>{currentUser ? currentUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users &&
            users?.map(user => (
              <a
                href={`#user-${user.id}`}
                className={cl('dropdown-item', {
                  'is-active': user.id === currentUser?.id,
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
