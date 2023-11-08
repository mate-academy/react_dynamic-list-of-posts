import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  onUserSelect: (user: User) => void;
  userSelected: User | null;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onUserSelect,
  userSelected,
}) => {
  const [usersVisible, setUsersVisible] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': usersVisible })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setUsersVisible(curr => !curr)}
        >
          <span>
            {userSelected?.name || 'Choose a user'}
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
              className="dropdown-item"
              onClick={() => {
                onUserSelect(user);
                setUsersVisible(false);
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
