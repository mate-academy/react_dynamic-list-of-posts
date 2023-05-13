import React from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { SelectedUser } from '../types/SelectedUser';

interface Props {
  users: User[]
  isVisible: boolean
  onToggle: () => void
  onSelectUser: (user: User) => void
  selectedUser: SelectedUser | null
}

export const UserSelector: React.FC<Props> = ({
  users, isVisible, onToggle, onSelectUser: onSelect, selectedUser,
}) => {
  const isActive = (user: User) => (selectedUser?.id === user.id);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isVisible })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={onToggle}
        >
          <span>
            {selectedUser
              ? selectedUser.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isVisible && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <ul>
              {users.map(user => {
                return (
                  <li key={user.id}>
                    <a
                      href={`#user-${user.id}`}
                      className={classNames(
                        'dropdown-item',
                        { 'is-active': isActive(user) },
                      )}
                      onClick={() => onSelect(user)}
                    >
                      {user.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
