import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

interface Props {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(curState => !curState);
  };

  const handleClose = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsActive(false);
    }
  };

  const handleSelect = (user: User) => {
    onSelectUser(user);
    setIsActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isActive,
      })}
      onBlur={handleClose}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggle}
        >
          <span>{selectedUser?.name ?? 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              key={user.id}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
