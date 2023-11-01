import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Users } from './Users';

type Props = {
  users: User[],
  user: User,
};

export const UserSelector: React.FC<Props> = ({ users, user }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': open })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpen(!open)}
        >
          {user ? <span>{user.name}</span> : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <Users users={users} />
      </div>
    </div>
  );
};
