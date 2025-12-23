import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

interface Props {
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  users: User[];
  userId: number | null;
  isDropdownOpen: boolean;
}

export const UserSelector: React.FC<Props> = ({
  setUserId,
  setIsDropdownOpen,
  users,
  userId,
  isDropdownOpen,
}) => {
  const selectedUser = users.find(user => user.id === userId)?.name;

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownOpen })}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsDropdownOpen(false);
        }
      }}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{selectedUser ? `${selectedUser}` : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                href={`#user-${user.id}`}
                key={user.id}
                className={classNames('dropdown-item', {
                  'is-active': userId === user.id,
                })}
                onClick={() => {
                  setUserId(user.id);
                  setIsDropdownOpen(false);
                }}
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
