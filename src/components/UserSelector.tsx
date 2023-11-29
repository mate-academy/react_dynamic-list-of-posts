/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import classNames from 'classnames';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PostsContext } from './PostContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { users, selectedUser, setSelectedUser } = useContext(PostsContext);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current
      && !dropdownRef.current.contains(event.target as Node)) {
      setActiveDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectedUser = (item: User) => {
    setSelectedUser(item);
    setActiveDropdown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': activeDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setActiveDropdown(!activeDropdown)}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        ref={dropdownRef}
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': selectedUser?.id === user.id },
              )}
              onClick={() => handleSelectedUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
