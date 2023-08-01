import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  handleSelectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  handleSelectUser,
}) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const handleDropdownControl = () => (
    setIsOpenDropDown(!isOpenDropDown));

  const handleUserSelect = (user: User) => {
    handleSelectUser(user);
    handleDropdownControl();
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpenDropDown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownControl}
        >
          {selectedUser === null
            ? (<span>Choose a user</span>)
            : (<span>{selectedUser.name}</span>)}

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
                onClick={() => handleUserSelect(user)}
                className={classNames('dropdown-item',
                  { 'is-active': selectedUser?.id === user.id })}
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
