import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { User } from '../types/User';
import { getUsers } from '../api/users';
import { ErrorType } from '../Enums/Error';
import { useRef } from 'react';

type Props = {
  selectedUserId: number | null;
  onSelect: (userId: number) => void;
  onError: (error: string) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUserId,
  onSelect,
  onError,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const selectedUser = users.find(user => user.id === selectedUserId);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

  const handleUserSelect = useCallback(
    (user: User) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      onSelect(user.id);
      setIsOpen(false);
    },
    [onSelect],
  );

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {
        onError(ErrorType.UNEXPECTED);
      });
  }, [onError]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const dropdown = dropdownRef.current;

      if (!dropdown) {
        return;
      }

      if (!dropdown.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', isOpen && 'is-active')}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggle}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          {users.map(user => (
            <a
              key={user.id}
              href={`user-${user.id}`}
              className={cn(
                'dropdown-item',
                selectedUserId === user.id && 'is-active',
              )}
              onClick={handleUserSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      }
    </div>
  );
};
