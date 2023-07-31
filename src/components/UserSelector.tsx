import React, { createRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { PostsContext } from '../context/postsContext';

export const UserSelector: React.FC = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const {
    users,
    selectedUser,
    setSelectedUser,
    setSelectedPost,
  } = React.useContext(PostsContext);
  const dropdown = createRef<HTMLButtonElement>();

  useEffect(() => {
    function hideDropdown(event: MouseEvent) {
      if (!isDropdownActive) {
        return;
      }

      if (!dropdown.current?.contains(event.target as Node)) {
        setIsDropdownActive(false);
      }
    }

    document.addEventListener('click', hideDropdown);

    return () => {
      document.removeEventListener('click', hideDropdown);
    };
  }, [isDropdownActive]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          ref={dropdown}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(true)}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.length > 0 && users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => {
                setSelectedUser(user);
                setIsDropdownActive(false);
                setSelectedPost(null);
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
