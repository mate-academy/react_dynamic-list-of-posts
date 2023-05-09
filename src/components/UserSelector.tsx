import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface Props {
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
  users: User[],
  selectedUser: User | null,
}

export const UserSelector: React.FC<Props> = ({
  setSelectedUser, users, selectedUser,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

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
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          <span>
            {selectedUser ? selectedUser?.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {menuIsOpen ? (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  {
                    'is-active': user === selectedUser,
                  },
                )}
                onClick={() => {
                  setSelectedUser(user);
                  setMenuIsOpen(false);
                }}
                key={user.id}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
