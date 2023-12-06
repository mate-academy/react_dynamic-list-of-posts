import React, { useState, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

interface T {
  users: User[],
  setSelectedUser: Dispatch<SetStateAction<null | User>>,
  setSelectedPost: Dispatch<SetStateAction<null | Post>>,
  selectedUser: User | null,
}

export const UserSelector: React.FC<T> = ({
  users,
  setSelectedUser,
  selectedUser,
  setSelectedPost,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const focused = () => {
    if (isFocused) {
      return setIsFocused(false);
    }

    return setIsFocused(true);
  };

  const handleChangeUser = (user: User) => {
    setSelectedUser(user);
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
          onClick={focused}
          onBlur={() => setIsFocused(false)}
        >
          <span>{!selectedUser ? 'Choose a user' : selectedUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isFocused && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                key={user.id}
                onMouseDown={() => handleChangeUser(user)}
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
