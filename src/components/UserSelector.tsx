import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { usePosts } from '../context/PostContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    setSelectedPostId,
  } = usePosts();

  const [dropdownShow, setDropdownShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setDropdownShow(false);
    setSelectedPostId(0);
  };

  const userName = selectedUser ? selectedUser.name : 'Choose a user';

  const handleDropdownBlur = (event: MouseEvent) => {
    // Перевірка, чи клікнуто поза елементом dropdown
    if (dropdownRef.current
      && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDropdownBlur);

    return () => {
      document.removeEventListener('click', handleDropdownBlur);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': dropdownShow,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdownShow(!dropdownShow)}
        >
          <span>
            {userName}
          </span>

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
