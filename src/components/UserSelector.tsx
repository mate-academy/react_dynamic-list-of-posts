import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  onSelect: (userId: number) => Promise<void>;
  selectedId: number | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onSelect,
  selectedId,
}) => {
  const [isActive, setIsActive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: Event) {
      if (!dropdownRef.current) {
        return;
      }

      const target = e.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!dropdownRef.current.contains(target)) {
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsActive(prev => !prev);

  const handleClick = async (id: number) => {
    try {
      onSelect(id);
    } catch (error) {
      throw error;
    }
  };

  const selectedUser = users.find(u => u.id === selectedId);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          onClick={toggleDropdown}
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
          {users.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={e => {
                  e.preventDefault();

                  handleClick(user.id);
                  toggleDropdown();
                }}
                className={cn('dropdown-item', {
                  'is-active': selectedId === user.id,
                })}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
