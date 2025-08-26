import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

interface Props {
  users: User[];
  selectedUser: User | undefined;
  setSelectedUser: (value: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdown(prev => !prev)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser && selectedUser.id === user.id,
                })}
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  setDropdown(false);
                }}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
