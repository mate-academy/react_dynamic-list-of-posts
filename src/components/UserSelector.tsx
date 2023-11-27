import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  users: User[],
  selectedUser: User | null,
  setSelectedUser: (value: User) => void,
  setSelectedPost: (value: Post | null) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleSelectUser = (user: User) => () => {
    setSelectedUser(user);
    setIsActive(false);
    setSelectedPost(null);
  };

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
          onClick={() => setIsActive(!isActive)}
        >
          <span>
            {!selectedUser ? (
              'Choose a user'
            ) : (
              selectedUser.name
            )}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isActive && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={handleSelectUser(user)}
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
