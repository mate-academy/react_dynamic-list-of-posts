import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[],
  setSelectedUser: (userId: number) => void,
  selectedUserId: number,
};

export const UserSelector: React.FC<Props> = ({
  users,
  setSelectedUser,
  selectedUserId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedUser = users.find((user) => user.id === selectedUserId);

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
          onClick={() => {
            setIsOpen(!isOpen);
          }}
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

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <a
                  href={`mailto:${user.email}`}
                  className={classNames('dropdown-item', {
                    'is-active': selectedUserId === user.id,
                  })}
                  onClick={() => {
                    setSelectedUser(user.id);
                    setIsOpen(!isOpen);
                  }}
                >
                  {user.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
