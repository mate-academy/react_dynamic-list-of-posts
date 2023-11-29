import React from 'react';
import { User } from '../types/User';
import { UserItem } from './UserItem';

interface Props {
  users: User[],
}

export const UserSelector: React.FC<Props> = ({ users }) => {
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
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <UserItem user={user} />
          ))}
          {/* <a href="#user-1" className="dropdown-item">Leanne Graham</a>
          <a href="#user-2" className="dropdown-item is-active">Ervin Howell</a>
          <a href="#user-3" className="dropdown-item">Clementine Bauch</a>
          <a href="#user-4" className="dropdown-item">Patricia Lebsack</a>
          <a href="#user-5" className="dropdown-item">Chelsey Dietrich</a> */}
        </div>
      </div>
    </div>
  );
};
