import { useContext, useRef, useState, useEffect } from 'react';
import cn from 'classnames';

import {
  PostsSettersContext,
  PostsValueContext,
} from '../../Context/PostsContext';
import { User } from '../../types/User';

export const UserSelector: React.FC = () => {
  const { users, selectedUser } = useContext(PostsValueContext);
  const { setSelectedUser } = useContext(PostsSettersContext);
  const [dropdownActive, setDropdownActive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setDropdownActive(false);
  };

  const handleDporpdownActive = () => {
    setDropdownActive(!dropdownActive);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownActive(false);
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
      className={cn('dropdown', {
        'is-active': dropdownActive,
      })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDporpdownActive}
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
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              key={user.id}
              onClick={() => {
                handleSelectUser(user);
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
