import React from 'react';
import { User } from '../types/User';

type Props = {
  users: User[]
  hendleSelector: () => void
  openSelector: boolean
  hendleUser: (user: User) => void
  isUser: User | undefined
};

export const UserSelector: React.FC<Props> = ({
  users,
  hendleSelector,
  openSelector,
  hendleUser,
  isUser,
}) => {
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
          onClick={hendleSelector}
        >
          <span>
            {isUser ? isUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {openSelector && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div
            className="dropdown-content"
          >
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => hendleUser(user)}
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
