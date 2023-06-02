import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { ErrorMessage } from '../types/ErrorMessage';
import { client } from '../utils/fetchClient';

type Props = {
  getActiveUser:(user: User | null) => void,
  activeUser: User | null,
  setErrorMessage: (message : ErrorMessage) => void
};

export const UserSelector: React.FC<Props> = ({
  getActiveUser,
  activeUser,
  setErrorMessage,
}) => {
  const [showUserList, setShowUserList] = useState(false);
  const [users, setUsers] = useState<User []>([]);

  useEffect(() => {
    client.get<User[]>('/users/')
      .then(response => setUsers(response))
      .catch(() => setErrorMessage(ErrorMessage.LoadingUser));
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    const { relatedTarget } = e;

    if (!relatedTarget || !relatedTarget.classList.contains('dropdown-item')) {
      setShowUserList(false);
    }
  };

  const handleSelectUser = (user: User) => {
    getActiveUser(user);
    setShowUserList(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowUserList(true)}
          onBlur={handleBlur}

        >
          <span>{activeUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        style={{ display: showUserList ? 'block' : 'none' }}
      >
        <div
          className="dropdown-content"
        >
          {users.map((user: User) => (
            <a
              href={`#user-${user.id}`}
              className={cn(
                'dropdown-item',
                { 'is-active': user.id === activeUser?.id },
              )}
              onClick={() => handleSelectUser(user)}
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
