import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | null;
  onUserSelected: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onUserSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isOpen })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(open => !open)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={event => {
                event.preventDefault();
                onUserSelected(user);
                setIsOpen(false);
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
