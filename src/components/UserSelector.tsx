import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  onPost: (data: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onPost,
  selectedUser,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownActive })}
      role="button"
      tabIndex={0}
      onFocus={() => setIsDropdownActive(true)}
      onBlur={() => setIsDropdownActive(false)}
      onMouseDown={() => setIsDropdownActive(!isDropdownActive)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => {
            const handleUserLinkClick = (
              e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
            ) => {
              e.preventDefault();
              onPost(user);
              setIsDropdownActive(false);
            };

            return (
              <a
                key={user.id}
                onClick={handleUserLinkClick}
                href={`user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': user === selectedUser,
                })}
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
