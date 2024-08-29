import React, { useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import cn from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | undefined;
  setSelectedUser: (user: User) => void;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [focused, setFocused] = useState(false);

  const toggleDropdown = () => {
    setFocused(prev => !prev);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setFocused(false);
    setSelectedPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': focused })}
      onBlur={() => setFocused(false)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                href={`#user-${id}`}
                className={cn('dropdown-item', {
                  'is-active': selectedUser?.id === id,
                })}
                key={id}
                onClick={() => handleUserSelect(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
