import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { UserComponent } from './UserComponent';

interface Props {
  onSelectedUser: (value: User) => void;
  selectedUser: User | null;
}

export const UserSelector: React.FC<Props> = React.memo(
  ({ onSelectedUser, selectedUser }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [menuActive, setMenuActive] = useState<boolean>(false);

    useEffect(() => {
      getUsers().then(setUsers);
    }, []);

    const handleSelectUser = useCallback(
      (user: User) => {
        onSelectedUser(user);
        setMenuActive(false);
      },
      [onSelectedUser],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLButtonElement, Element>) => {
        e.preventDefault();
        if (menuActive) {
          setTimeout(() => setMenuActive(false), 200);
        }
      },
      [menuActive],
    );

    return (
      <div data-cy="UserSelector" className="dropdown is-active">
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => setMenuActive(current => !current)}
            onBlur={e => handleBlur(e)}
          >
            <span>{selectedUser?.name || 'Choose a user'}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>

        {menuActive && (
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {users.map(user => (
                <UserComponent
                  key={user.id}
                  user={user}
                  onMenuActive={setMenuActive}
                  onSelectedUser={handleSelectUser}
                  selectedUser={selectedUser}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

UserSelector.displayName = 'UserSelector';
