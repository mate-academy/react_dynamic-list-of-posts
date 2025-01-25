import React, { useState, useEffect } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelectedUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectedUser,
}) => {
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    if (!isListOpen) {
      return;
    }

    const handleDocumentClick = () => {
      setIsListOpen(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, [isListOpen]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isListOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setIsListOpen(prev => !prev);
          }}
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
              href={`#${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => onSelectedUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
