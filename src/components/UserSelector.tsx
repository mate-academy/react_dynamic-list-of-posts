import classNames from 'classnames';
import React from 'react';
import { User } from '../types/User';

interface Props {
  users: User[],
  handleSelectUser: (user: User) => void,
  selectedUser: User | null,
  toggle: () => void,
  isOpen: boolean,
}

export const UserSelector: React.FC<Props> = ({
  users,
  handleSelectUser,
  selectedUser,
  toggle,
  isOpen,
}) => {
  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggle}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

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
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item', { 'is-active': user.id === selectedUser?.id },
              )}
              onClick={() => {
                handleSelectUser(user);
                toggle();
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
