/* eslint-disable max-len */
import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  usersFromServer: User[],
  selectedUser: number,
  setSelectedUser: (data: number) => void
};

export const UserSelector: React.FC<Props> = ({ usersFromServer, selectedUser, setSelectedUser }) => {
  const [menuShown, setMenuShown] = useState(false);
  const [userName, setUserName] = useState('');

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
          onClick={() => setMenuShown(true)}
        >
          {selectedUser
            ? <span>{userName}</span>
            : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {menuShown
        && (
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {usersFromServer.map(user => {
                return (
                  <a
                    key={user.id}
                    href={`#user-${user.id}`}
                    className={cn('dropdown-item', {
                      'is-active': user.id === selectedUser,
                    })}
                    onClick={() => {
                      setSelectedUser(user.id);
                      setMenuShown(false);
                      setUserName(user.name);
                    }}
                  >
                    {user.name}
                  </a>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
};
