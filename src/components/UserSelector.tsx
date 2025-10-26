import React, { useState, useEffect, useRef, Ref } from 'react';
import { User } from '../types/User';

interface UserSelectorProps {
  users: User[];
  selectedId: number | null;
  onSelect: (userId: number | null) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const ref = containerRef.current;

      if (ref && event.target instanceof Node && !ref.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={containerRef as Ref<HTMLDivElement>}
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <button
        type="button"
        className="button"
        data-cy="UserSelect"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedId
          ? users.find((u) => u.id === selectedId)?.name
          : 'Choose a user'}
      </button>

      <div className="dropdown-menu">
        <div className="dropdown-content">
          {users.length === 0 ? (
            <span className="dropdown-item has-text-grey">
              Loading users...
            </span>
          ) : (
            users.map((user) => (
              <a
                href="#/"
                key={user.id}
                className={`dropdown-item ${selectedId === user.id ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  onSelect(user.id);
                }}
              >
                {user.name}
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
