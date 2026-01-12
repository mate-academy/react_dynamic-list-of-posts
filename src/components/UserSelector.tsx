import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader/Loader';

interface Props {
  user: User | null;
  onSelect: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({ user, onSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    client
      .get<User[]>('/users')
      .then(setUsers)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpened })}
      onBlur={event =>
        !event.currentTarget.contains(event.relatedTarget) && setIsOpened(false)
      }
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpened(prev => !prev)}
        >
          <span>{user ? user.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {isLoading && (
          <div className="dropdown-content">
            <Loader />
          </div>
        )}

        {hasError && (
          <div className="dropdown-content">
            <div className="dropdown-item has-text-danger">
              Something went wrong!
            </div>
          </div>
        )}

        {!isLoading && !hasError && (
          <div className="dropdown-content">
            {users.map(usr => (
              <a
                key={usr.id}
                href={`#user-${usr.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user?.id === usr.id,
                })}
                onClick={event => {
                  event.preventDefault();
                  onSelect(usr);
                  setIsOpened(false);
                }}
              >
                {usr.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
