import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

interface Props {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleCloseDropDownMenu(e: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsActiveDropdown(false);
      }
    }

    document.addEventListener('click', handleCloseDropDownMenu);

    return () => document.removeEventListener('click', handleCloseDropDownMenu);
  });

  return (
    <div
      ref={dropDownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActiveDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActiveDropdown(!isActiveDropdown)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => {
                setSelectedUser(user);
                setIsActiveDropdown(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
