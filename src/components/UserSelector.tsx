import React, { useCallback, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

interface Props {
  users: User[];
  currentUser: User | null;
  handleSelectUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  currentUser,
  handleSelectUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onSelect = useCallback(
    (user: User) => {
      setIsOpen(false);
      handleSelectUser(user);
    },
    [handleSelectUser],
  );

  useEffect(() => {
    function escapeSelect(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', escapeSelect);

    return () => document.removeEventListener('click', escapeSelect);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(true)}
        >
          <span>{!currentUser ? 'Choose a user' : currentUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {users.length !== 0 && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === currentUser?.id,
                })}
                key={user.id}
                onClick={() => onSelect(user)}
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
