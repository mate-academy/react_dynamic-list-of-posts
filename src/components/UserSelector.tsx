import React, { useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[] | null;
  selectedUser: User | null;
  onUserSelect: (value: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onUserSelect,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onUserClick = (user: User) => {
    if (selectedUser?.id !== user.id) {
      onUserSelect(user);
    }

    setMenuOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': menuOpen })}
      tabIndex={-1}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setMenuOpen(false);
        }
      }}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setMenuOpen(currentOption => !currentOption)}
        >
          <span>
            {selectedUser === null ? 'Choose a user' : selectedUser.name}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map(user => (
            <a
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              key={user.id}
              onClick={() => onUserClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
