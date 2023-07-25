import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  handleUserSelect: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  handleUserSelect,
  selectedUser,
}) => {
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropDownOpened(!isDropDownOpened)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropDownOpened && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map((user) => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={(event) => {
                  handleUserSelect(event, user);
                  setIsDropDownOpened(false);
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
