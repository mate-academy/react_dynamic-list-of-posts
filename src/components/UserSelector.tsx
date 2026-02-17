import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

interface Props {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onUserSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUserClick = (user: User) => {
    onUserSelect(user);
    setIsOpen(false);
  };

  return (
    <div className="UserSelector">
      {isOpen && (
        <button
          type="button"
          className="UserSelector__overlay"
          aria-label="Close user selector"
          onClick={() => setIsOpen(false)}
        />
      )}

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
            onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
          >
            <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onClick={e => {
                  e.preventDefault();
                  handleUserClick(user);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
