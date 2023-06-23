import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useOutsideClick } from '../hooks/useOutsideClick';

type Props = {
  usersFromServer: User[],
  setSelectedUser: (user: User) => void,
  selectedUser: User | null,
};

export const UserSelector: React.FC<Props> = ({
  usersFromServer,
  setSelectedUser,
  selectedUser,
}) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  const handlerShowUsersList = () => {
    setShowDropdownMenu(prevState => !prevState);
  };

  const handlerSelectUser = (userForSelect: User) => {
    setSelectedUser(userForSelect);
    handlerShowUsersList();
  };

  const handleClickOutside = () => {
    setShowDropdownMenu(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showDropdownMenu })}
      ref={ref}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handlerShowUsersList}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {
            usersFromServer.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={
                  classNames('dropdown-item',
                    { 'is-active': user.id === selectedUser?.id })
                }
                onClick={() => handlerSelectUser(user)}
              >
                {user.name}
              </a>
            ))
          }
        </div>
      </div>
    </div>
  );
};
