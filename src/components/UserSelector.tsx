import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { User } from '../types/User';

type StateSelectedUser = {
  selectedUser: User | null;
  setSelectedUser: (el: User) => void;
};

type Props = {
  users: User[];
  stateSelectedUser: StateSelectedUser;
  setSlidbarIsActive: (el: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  stateSelectedUser,
  setSlidbarIsActive,
}) => {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleUserClick = (user: User) => {
    stateSelectedUser.setSelectedUser(user);
    setSlidbarIsActive(false);
    setMenuIsActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setMenuIsActive(false);
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
      ref={dropdownRef}
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': menuIsActive })}
      onClick={() => setMenuIsActive(!menuIsActive)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{stateSelectedUser.selectedUser?.name || 'Choose a user'}</span>
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
                'is-active': stateSelectedUser.selectedUser?.id === user.id,
              })}
              key={user.id}
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
