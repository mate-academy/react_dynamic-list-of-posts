import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  handleSelectUser: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  handleSelectUser,
  selectedUser,
}) => {
  const [isSelectOpened, setIsSelectOpened] = useState(false);

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
          onClick={() => setIsSelectOpened(!isSelectOpened)}
        >
          <span>
            {selectedUser ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isSelectOpened && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map((user) => (
              <a
                href={`#user-${user.id}`}
                className="dropdown-item"
                key={user.id}
                onClick={(event) => {
                  handleSelectUser(event, user);
                  setIsSelectOpened(false);
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
