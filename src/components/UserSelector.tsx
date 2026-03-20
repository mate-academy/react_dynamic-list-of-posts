import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

interface Props {
  users: User[];
  selectedUser: User | null;
  dropdownActive: boolean;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  activateSelector: (event: React.MouseEvent<HTMLElement>) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  dropdownActive,
  setSelectedUser,
  activateSelector,
}) => {
  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdownActive })}
      onClick={activateSelector}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user: User) => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onClick={() => setSelectedUser(user)}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
