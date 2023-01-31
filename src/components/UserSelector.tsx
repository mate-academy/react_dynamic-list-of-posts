import cn from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  onSelect: (user: User) => void
  selectedUser: User | null;
  loadMoreUsers: () => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
  loadMoreUsers,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': dropdownOpen,
      })}
    >
      <div
        className="dropdown-trigger"
      >
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdownOpen(prev => !prev)}
          onBlur={() => setDropdownOpen(false)}
        >
          <span>
            {selectedUser
              ? selectedUser.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div
          className="dropdown-content"
        >
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onMouseDown={() => {
                onSelect(user);
              }}
            >
              {user.name}
            </a>
          ))}
          <a
            href="#loadmore"
            className="dropdown-item button is-outlined is-info"
            onMouseDown={(event) => {
              event.preventDefault();
              loadMoreUsers();
              setDropdownOpen(true);
            }}
          >
            Load More +
          </a>
        </div>
      </div>
    </div>
  );
};
