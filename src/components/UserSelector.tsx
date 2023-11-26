import React from 'react';
import cn from 'classnames';

import { User } from '../types/User';

type Props = {
  usersFromServer: User[],
  onUserClick: (user: User) => void,
  onDropdown: () => void,
  isVisibleUsers: boolean,
  selectedUser: User | null,
}


export const UserSelector: React.FC<Props> = ({
  usersFromServer,
  onDropdown,
  onUserClick,
  isVisibleUsers,
  selectedUser,
}) => {

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
          onClick={onDropdown}
        >
          {selectedUser === null
            ? <span>Choose a user</span>
            : <span>{selectedUser.name}</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isVisibleUsers && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {usersFromServer.map(user => (
              <a
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                key={user.id}
                onClick={() => onUserClick(user)}
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
