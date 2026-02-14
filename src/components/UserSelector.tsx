import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  onUserSelect: (user: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onUserSelect,
  selectedUser,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleToggleSelect = () => {
    setIsActive(!isActive);
  };

  const handleSelect = (event: React.MouseEvent, user: User) => {
    event.preventDefault();
    setIsActive(false);

    if (!user || user.id === selectedUser?.id) {
      return;
    }

    onUserSelect(user);
  };

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown', {
        'is-active': isActive,
      })}
      tabIndex={-1}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleSelect}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isActive && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            background: 'transparent',
          }}
          onClick={() => setIsActive(false)}
          aria-label="Close dropdown overlay"
        />
      )}

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.name === user.name,
              })}
              onClick={event => handleSelect(event, user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
