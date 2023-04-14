import React, { useState } from 'react';
import classNames from 'classnames';
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
  const [currentUser, setUser] = useState<User | null>(null);

  const handleChooseUser = (id: number, user: User) => {
    loadingPosts(id);
    setOpenList(false);
    setUser(user);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isOpen },
      )}
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
          <span>{!currentUser ? 'Choose a user' : `${currentUser.name}`}</span>

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
                className={classNames(
                  'dropdown-item',
                  { 'is-active': user.id === currentUser?.id },
                )}
                onMouseDown={() => handleChooseUser(user.id, user)}
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
