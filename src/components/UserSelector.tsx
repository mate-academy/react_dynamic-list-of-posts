import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { usePosts } from './PostsProvider';

export const UserSelector = () => {
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { users, selectedUser, setSelectedUser } = usePosts();

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setDropdownIsActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current
      && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={cn('dropdown', { 'is-active': dropdownIsActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdownIsActive(!dropdownIsActive)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item',
                { 'is-active': user.id === selectedUser?.id })}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
