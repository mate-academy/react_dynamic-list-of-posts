import React, { useState } from 'react';

import { User } from '../types/User';
import classNames from 'classnames';

export const UserSelector: React.FC<{
  users: User[];
  selectedUserId: number | null;
  changeSelectedUserId: (id: number) => void;
}> = ({ users, selectedUserId, changeSelectedUserId }) => {
  const [isDropped, setIsDropped] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropped })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onMouseDown={() => {
            setIsDropped(pState => !pState);
          }}
          onBlur={() => {
            setIsDropped(false);
          }}
        >
          <span>
            {selectedUserId === null
              ? 'Choose a user'
              : users.find(({ id }) => id === selectedUserId)?.name}
          </span>

          <span className="icon is-small">
            <i
              className={classNames('fas', {
                'fa-angle-down': !isDropped,
                'fa-angle-up': isDropped,
              })}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              onMouseDown={() => {
                changeSelectedUserId(user.id);
                setIsDropped(false);
              }}
              key={user.id}
              href={'#user-' + user.id}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUserId,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
