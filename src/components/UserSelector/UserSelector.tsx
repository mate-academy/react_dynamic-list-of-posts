import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
};

const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onUserSelect,
}) => {
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);

  const openDropdown = () => {
    setDropdownActive(true);
  };

  const handlerSelectUser = (user: User) => {
    if (user.id !== selectedUser?.id) {
      onUserSelect(user);
    }

    setDropdownActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn(
        'dropdown',
        { 'is-active': dropdownActive },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={openDropdown}
        >
          <span>
            {
              selectedUser ? (
                selectedUser.name
              ) : (
                'Choose a user'
              )
            }
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user, index) => (
            <a
              key={user.id}
              href={`#user-${index + 1}`}
              className={cn(
                'dropdown-item',
                { 'is-active': selectedUser?.id === user.id },
              )}
              onClick={() => handlerSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const MemoUserSelector = React.memo(UserSelector);
