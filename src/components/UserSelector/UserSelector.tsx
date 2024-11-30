import React, { useState } from 'react';
import classNames from 'classnames';

import { User } from '../../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelect: (newUser: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleClickOutside = () => {
    setIsActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClick}
          onBlur={handleClickOutside}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

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
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              key={user.id}
              onMouseDown={() => onSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
