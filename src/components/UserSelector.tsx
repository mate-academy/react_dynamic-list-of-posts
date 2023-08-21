import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  onSetUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({ users, onSetUser }) => {
  const [dropdown, setDropdown] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const dropdownSelect = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (dropdownSelect.current
        && !dropdownSelect.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', onClick);

    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleSelectUser = (user: User) => {
    setUserName(user.name);
    onSetUser(user);
    setDropdown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdown(current => !current)}
        >
          <span>{userName || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        ref={dropdownSelect}
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map((user, i) => (
            <a
              key={user.id}
              href={`#user-${i + 1}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': user.name === userName },
              )}
              onClick={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
