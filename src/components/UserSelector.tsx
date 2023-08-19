import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  onPost: (data: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = (
  { users, onPost, selectedUser },
) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isDropdownActive })}
    >
      <div className="dropdown-trigger">
        <button
          onClick={() => (setIsDropdownActive(true))}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          {selectedUser
            ? (<span>{selectedUser.name}</span>)
            : (<span>Choose a user</span>)}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
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
                className={cn('dropdown-item',
                  { 'is-active': user === selectedUser })}
              >
                {user.name}
              </a>
            );
          })}
          {/* <a href="#user-1" className="dropdown-item">Leanne Graham</a>
          <a href="#user-2" className="dropdown-item is-active">Ervin Howell</a>
          <a href="#user-3" className="dropdown-item">Clementine Bauch</a>
          <a href="#user-4" className="dropdown-item">Patricia Lebsack</a>
          <a href="#user-5" className="dropdown-item">Chelsey Dietrich</a> */}
        </div>
      </div>
    </div>
  );
};
