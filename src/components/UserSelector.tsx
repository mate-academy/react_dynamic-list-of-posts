import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
  users: User[];
};

export const UserSelector: React.FC<Props> = ({
  selectedUserId,
  setSelectedUserId,
  users,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          value={selectedUserId}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>
            {selectedUserId
              ? users.find(user => user.id === selectedUserId)?.name
              : 'Choose a user'}
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map((user: User) => (
              <a
                key={user.id}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUserId,
                })}
                onClick={() => {
                  setSelectedUserId(user.id);
                  setIsOpen(false);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
