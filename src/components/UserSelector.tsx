import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type UserSelectorProps = {
  users: User[];
  selectedUser: User | null;
  onSelectedUser: (userId: number) => void;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  onSelectedUser,
}) => {
  const [isShowUsers, setIsShowUsers] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectUser = (userId: number) => {
    onSelectedUser(userId);
    setIsShowUsers(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsShowUsers(false);
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
      className={cn('dropdown', { 'is-active': isShowUsers })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsShowUsers(!isShowUsers)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users &&
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => handleSelectUser(user.id)}
              >
                {user.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
