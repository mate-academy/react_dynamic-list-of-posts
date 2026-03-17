import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

interface Props {
  users: User[];
  activeUser: number | null;
  setActiveUser: (userId: number) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  activeUser,
  setActiveUser,
}) => {
  const [focused, setFocused] = useState(false);
  const selectedUserName =
    users.find(u => u.id === activeUser)?.name || 'Choose a user';

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': focused })}
      onBlur={() => setFocused(false)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setFocused(!focused)}
        >
          <span>{selectedUserName}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': activeUser === user.id,
              })}
              onMouseDown={e => {
                e.preventDefault();
                setActiveUser(user.id);
                setFocused(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
