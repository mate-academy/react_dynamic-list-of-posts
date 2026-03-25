import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  selectUser: (user: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectUser,
  selectedUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOnUser = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    event.preventDefault();
    setIsOpen(false);

    return selectUser(user);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={cn('dropdown', {
        'is-active': isOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#${user.id}`}
              key={user.id}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={event => handleClickOnUser(event, user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
