import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

interface Props {
  users: User[],
  selectedUser: User | null,
  setSelectedUser: (user: User | null) => void,
  setSelectedPost: (post: Post | null) => void,
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [dropdownIsActive, setDropdownIsActive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
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
      className={classNames('dropdown', { 'is-active': dropdownIsActive })}
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
          {users.map(user => (
            <a
              key={user.id}
              href="#user-2"
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
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
