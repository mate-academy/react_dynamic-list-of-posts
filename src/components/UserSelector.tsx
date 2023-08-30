import React from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  loadPosts: (userId: number) => void,
  dropdown: boolean,
  setDropdown: (value: boolean) => void,
  activeUserId: number,
};

export const UserSelector: React.FC<Props> = ({
  users,
  loadPosts,
  dropdown,
  setDropdown,
  activeUserId,
}) => {
  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdown })}
    >
      <div className="dropdown-trigger">
        <button
          onClick={() => setDropdown(!dropdown)}
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
            <a
              key={user.id}
              onClick={() => loadPosts(user.id)}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': activeUserId === user.id,
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
