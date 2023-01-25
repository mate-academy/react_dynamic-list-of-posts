import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type Props = {
  user: number;
  setUser: (id: number) => void;
  setError: (message: string) => void;
};

export const UserSelector: React.FC<Props> = ({
  user,
  setUser,
  setError,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError('Unable to get users'));
  }, []);

  const selectUser = (chosenUser: User) => {
    if (chosenUser.id !== user) {
      setUser(chosenUser.id);
      setUserName(chosenUser.name);
    }

    setIsListOpen(false);
  };

  const handleDocumentClick = () => {
    setIsListOpen(!isListOpen);
  };

  useEffect(() => {
    if (isListOpen) {
      document.addEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isListOpen]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown',
        { 'is-active': isListOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsListOpen(current => !current)}
        >
          <span>{userName || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(userFromList => (
            <a
              key={userFromList.id}
              href={`#user-${userFromList.id}`}
              className={classNames('dropdown-item',
                { 'is-active': userFromList.id === user })}
              onClick={() => selectUser(userFromList)}
            >
              {userFromList.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
