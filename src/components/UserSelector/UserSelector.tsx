import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { User } from '../../types';
import { useUsers } from '../../context';

export const UserSelector: React.FC = () => {
  const { users, selectedUser, handleOnSetSelectedUser } = useUsers();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelectUser = (user: User) => {
    handleOnSetSelectedUser(user);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
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
      className="dropdown is-active"
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          onClick={() => setIsMenuOpen(open => !open)}
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

      {isMenuOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                onClick={() => handleSelectUser(user)}
                className={cn('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                key={user.id}
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
