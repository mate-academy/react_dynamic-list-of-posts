import React from 'react';
import { User } from '../types/User';

interface UserSelectorProps {
  users: User[];
  onClickUsersDropdown: () => void;
  isDropdownActive: boolean;
  onSelectUser: (user: User | null) => void;
  selectedUser: User | null;
}

export const UserSelector: React.FC<UserSelectorProps> = React.memo(({
  users,
  onClickUsersDropdown,
  isDropdownActive,
  selectedUser,
  onSelectUser,
}) => {
  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={onClickUsersDropdown}
        >
          <span>{selectedUser ? selectedUser?.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropdownActive && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              const { id, name } = user;

              return (
                <a
                  href={`#user-${id}`}
                  className="dropdown-item"
                  onClick={() => onSelectUser(user)}
                  key={id}
                >
                  {name}
                </a>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
});
