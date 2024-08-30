import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  selectedUser: User | null | undefined;
  onSelect: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
  setSelectedPost,
}) => {
  const [focused, setFocused] = useState(false);

  const handlerToggleMenu = () => {
    setFocused(!focused);
  };

  const handleUserSelect = (user: User) => {
    setFocused(false);
    onSelect(user);
    setSelectedPost(null);
  };

  const handlerOnBlur = () => {
    setFocused(false);
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
          onClick={handlerToggleMenu}
          onBlur={handlerOnBlur}
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
