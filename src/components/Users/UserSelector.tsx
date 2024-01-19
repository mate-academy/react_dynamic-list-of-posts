import React, { useState } from 'react';
import classNames from 'classnames';
import { UsersList } from './UsersList';

export const UserSelector: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isMenu })}
    >
      <div className="dropdown-trigger">

        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsMenu(curr => !curr)}
        >
          <span>{userName || 'Choose a user'}</span>
          <span className="icon is-small">
            <i
              className="fas fa-angle-down"
              aria-hidden="true"
            />
          </span>
        </button>

      </div>
      <UsersList
        setIsMenu={setIsMenu}
        setUserName={setUserName}
      />
    </div>
  );
};
