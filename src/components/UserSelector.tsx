import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: User | undefined,
  setUser(user: User): void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setUser,
}) => {
  const [open, setOpen] = useState(false);

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
          onClick={() => setOpen(currentOpen => !currentOpen)}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {open && (
        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  {
                    'is-active': user.id === selectedUser?.id,
                  },
                )}
                onClick={() => {
                  if (selectedUser?.id === user.id) {
                    return;
                  }

                  setUser({ ...user });
                  setOpen(false);
                }}
                key={user.id}
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
