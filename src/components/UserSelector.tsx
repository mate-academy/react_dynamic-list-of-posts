import React, {
  useContext, useMemo, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { UsersContext } from '../store/UsersContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const { users, selectedUser, setSelectedUser } = useContext(UsersContext);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const queryElement = useRef<HTMLInputElement | null>(null);

  const visibleUsers = useMemo(
    () => users.filter(user => (
      user.name?.toLowerCase().includes(query.toLowerCase())
    )), [query, users],
  );

  const handleDropdownTriggerClick = () => {
    setIsOpen(!isOpen);
    queryElement.current?.focus();
  };

  const handleUserClick = (user: User) => {
    setQuery(user.name);
    setSelectedUser(user);
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
          aria-label="Open dropdown menu"
          onClick={handleDropdownTriggerClick}
        >
          <input
            placeholder="Choose a user"
            ref={queryElement}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setQuery('')}
            onBlur={() => setIsOpen(false)}
          />

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content my-dropdown">
            {visibleUsers.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onMouseDown={() => handleUserClick(user)}
                className={classNames(
                  'dropdown-item',
                  'my-dropdown-item',
                  { 'is-active': user.id === selectedUser?.id },
                )}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
