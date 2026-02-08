import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserContext } from './UserContext';
import { User } from '../types/User';

type Props = {
  currentUser: User | null;
  onSelectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  currentUser,
  onSelectUser,
}) => {
  const [selectIsOpen, setSelectIsOpen] = useState<boolean>(false);
  const users = useContext(UserContext);

  useEffect(() => {
    if (!selectIsOpen) {
      return;
    }

    const handleOutClick = () => {
      setSelectIsOpen(false);
    };

    document.addEventListener('click', handleOutClick);

    return () => document.removeEventListener('click', handleOutClick);
  }, [selectIsOpen]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': selectIsOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setSelectIsOpen(state => !state);
          }}
        >
          {currentUser ? (
            <span>{currentUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i
              className={classNames(
                'fas',
                !selectIsOpen ? 'fa-angle-down' : 'fa-angle-up',
              )}
              aria-hidden="false"
            />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': currentUser?.id === user.id,
              })}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onSelectUser(user);
                setSelectIsOpen(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
