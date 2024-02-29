import React, { useCallback, useContext, useState } from 'react';
import cn from 'classnames';
import { Context } from './Store';
import { User } from '../types/User';

interface Props {
  select: (userId: number) => void;
}

export const UserSelector: React.FC<Props> = React.memo(({ select }) => {
  const { users } = useContext(Context);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>();

  const handleSelected = useCallback(
    (user: User) => {
      if (user !== selectedUser) {
        setSelectedUser(user);
        select(user.id);
      }

      setOpenDropdown(!openDropdown);
    },
    [openDropdown, select, selectedUser],
  );

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {openDropdown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onClick={() => handleSelected(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
