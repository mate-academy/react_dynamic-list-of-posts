import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/interfaces';
import { useDropdownRef } from '../hooks/useDropdownRef';

type Props = {
  users: User[];
  selectedUser: User | null;
  handleSelectUser: (id: number) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  handleSelectUser,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const { dropdownRef } = useDropdownRef(setIsOpenDropdown);

  const toggleDropdown = () => {
    setIsOpenDropdown(prev => !prev);
  };

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
                onClick={() => {
                  handleSelectUser(user.id);
                  setIsOpenDropdown(false);
                }}
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
