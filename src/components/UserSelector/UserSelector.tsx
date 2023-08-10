import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import { client } from '../../utils/fetchClient';

interface Props {
  setUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({ setUser }) => {
  const [users, setUsers] = useState<User[]>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    client.get<User[]>('/users')
      .then(setUsers)
      .catch(e => {
        throw new Error(e);
      });
  }, []);

  const selectUser = (user: User) => {
    setUser(user);
    setCurrentUser(user);
    setIsDropdownActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current
        && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownActive(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
        >
          <span>{currentUser ? currentUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users && users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user === currentUser,
              })}
              onClick={() => selectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
