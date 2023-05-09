import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null,
  selectUser: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  selectUser,
}) => {
  const [isVisible, setIsVisible] = useState(false);

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
          onClick={() => setIsVisible(state => !state)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      {isVisible && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUser === user },
                )}
                onClick={() => {
                  selectUser(user);
                  setIsVisible(state => !state);
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
