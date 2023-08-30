import React from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  loadPosts: (userId: number) => void,
  dropdown: boolean,
  setDropdown: (value: boolean) => void,
  activeUserId: number,
  user: string,
  setUser: (name: string) => void
};

export const UserSelector: React.FC<Props> = ({
  user,
  setUser,
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
          <span>{user}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(({ id, name }) => (
            <a
              key={id}
              onClick={() => {
                setUser(name);
                loadPosts(id);
              }}
              href={`#user-${id}`}
              className={classNames('dropdown-item', {
                'is-active': activeUserId === id,
              })}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
