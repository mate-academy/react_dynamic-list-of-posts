import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [showAllUsersVisible, setShowAllUsersVisible] =
    useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedUserName = selectedUser ? selectedUser.name : 'Choose a user';

  const handleOnClickDropdownMenu = () => {
    setShowAllUsersVisible(current => !current);
  };

  const handlerOnClickSelectedUser = (user: User) => {
    setSelectedUser(user);
    setShowAllUsersVisible(false);
  };

  const handleClickOutsideDropdownMenu = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowAllUsersVisible(false);
    }
  };

  useEffect(() => {
    if (showAllUsersVisible) {
      document.addEventListener('click', handleClickOutsideDropdownMenu);
    } else {
      document.removeEventListener('click', handleClickOutsideDropdownMenu);
    }
  }, [showAllUsersVisible]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showAllUsersVisible })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOnClickDropdownMenu}
        >
          <span>{selectedUserName}</span>

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
                className={classNames('dropdown-item', {
                  'is-active': id === selectedUser?.id,
                })}
                onMouseDown={() => handlerOnClickSelectedUser(user)}
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
