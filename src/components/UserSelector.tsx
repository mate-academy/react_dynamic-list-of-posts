import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  onUserSelect: (user: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onUserSelect,
  selectedUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!dropRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropRef}
      className={cn('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => {
                onUserSelect(user);
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
