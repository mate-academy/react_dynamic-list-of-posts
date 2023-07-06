import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface UserSelectorProps {
  users: User[],
  selectedUser: User | null,
  userSelectedId: (user: User) => void,
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  userSelectedId,
}) => {
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': dropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          <span>{selectedUser ? selectedUser?.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': id === selectedUser?.id },
                )}
                onClick={() => {
                  userSelectedId(user);
                  setDropdownActive(false);
                }}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
