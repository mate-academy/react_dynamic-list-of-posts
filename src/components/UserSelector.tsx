import React, { RefObject } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
type Props = {
  users: User[];
  isOpenDropdown: boolean;
  selectedUser: User | null;
  handleSelectUser: (id: number) => void;
  toggleDropdown: () => void;
  dropdownRef: RefObject<HTMLDivElement>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  isOpenDropdown,
  selectedUser,
  handleSelectUser,
  toggleDropdown,
  dropdownRef,
}) => {
  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpenDropdown })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => toggleDropdown()}
        >
          <span>{!selectedUser ? 'Choose a user' : selectedUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onClick={() => handleSelectUser(user.id)}
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
