import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface Props {
  users: User[];
  selectedUser: User | null;
  onSelect: (id: number) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = useCallback(() => setIsOpen(prev => !prev), []);

  const ref = useRef<HTMLDivElement | null>(null);
  const handler = (e: MouseEvent) => {
    if (!ref.current) {
      return;
    }

    if (!ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div
      ref={ref}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
      onClick={handleClick}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
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
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => onSelect(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
