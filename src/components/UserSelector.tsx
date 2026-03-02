import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUserId: number | null;
  onSelect: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      if (!rootRef.current) {
        return;
      }

      if (!rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', onDocumentClick);

    return () => document.removeEventListener('click', onDocumentClick);
  }, []);

  const handleToggle = () => setIsOpen(prev => !prev);

  return (
    <div
      data-cy="UserSelector"
      ref={rootRef}
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggle}
        >
          <span>
            {selectedUserId
              ? (users.find(u => u.id === selectedUserId)?.name ??
                'Choose a user')
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className={`dropdown-item ${selectedUserId === user.id ? 'is-active' : ''}`}
              onClick={e => {
                e.preventDefault();
                setIsOpen(false);
                onSelect(user);
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
