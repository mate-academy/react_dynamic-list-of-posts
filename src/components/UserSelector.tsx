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

  const onFocused = () => {
    if (focused) {
      setFocused(false);
    } else {
      setFocused(true);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': focused })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={onFocused}
          onBlur={() => setFocused(false)}
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
                onClick={() => {
                  setSelectedUser(user);
                  setFocused(false);
                  setSelectedPost(null);
                }}
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
