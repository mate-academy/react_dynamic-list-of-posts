import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  selectedUser: User | null,
  setSelectedUser(user: User): void,
  users: User[],
  setLoading(loading: boolean): void,
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  users,
  setLoading,
}) => {
  const [expanded, setExpanded] = useState(false);

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
          onClick={() => setExpanded(!expanded)}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {expanded && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  {
                    'is-active': selectedUser === user,
                  },
                )}
                key={user.id}
                onClick={event => {
                  event.preventDefault();

                  if (selectedUser === user) {
                    return;
                  }

                  setLoading(true);
                  setSelectedUser(user);
                  setExpanded(false);
                }}
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
