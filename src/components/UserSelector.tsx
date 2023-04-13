import React, { useState } from 'react';
import { User } from '../types/User';

interface Props {
  users: User[],
  loadingPosts: (userId: number) => void,
}

export const UserSelector: React.FC<Props> = React.memo(({
  users,
  loadingPosts,
}) => {
  const [isOpen, setOpenList] = useState(false);
  const [currentUser, setUser] = useState('');

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
          onBlur={() => setOpenList(false)}
          onClick={() => setOpenList(!isOpen)}
        >
          <span>{!currentUser ? 'Choose a user' : `${currentUser}`}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onMouseDown={() => {
                  loadingPosts(user.id);
                  setOpenList(false);
                  setUser(user.name);
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
});
