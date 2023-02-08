import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[] | undefined
  selectedUserHandler: (user: User) => void
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserHandler,
}) => {
  const [isdropdownMenu, setIsdropdownMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const onClickHandler = () => {
    setIsdropdownMenu(!isdropdownMenu);
  };

  const dropdownItemHandler = (user: User) => {
    setSelectedUser(user);
    selectedUserHandler(user);
    setIsdropdownMenu(false);
  };

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
          onClick={onClickHandler}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isdropdownMenu && (
        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
          <div className="dropdown-content">
            {users?.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onClick={() => dropdownItemHandler(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
