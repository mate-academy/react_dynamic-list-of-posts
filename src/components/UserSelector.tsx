import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[] | [];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  const toggleMenuOpen = () => {
    setIsActiveDropdown(prev => !prev);
  };

  const onBlurClick = (event: MouseEvent) => {
    if (
      dropdown.current &&
      !(dropdown.current as HTMLElement).contains(event.target as Node)
    ) {
      setIsActiveDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onBlurClick);

    return () => {
      document.removeEventListener('mousedown', onBlurClick);
    };
  }, []);

  return (
    <div
      ref={dropdown}
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isActiveDropdown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleMenuOpen}
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
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  setIsActiveDropdown(false);
                }}
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
