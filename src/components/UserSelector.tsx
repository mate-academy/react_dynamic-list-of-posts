import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [visibleDropdown, setVisibleDropdown] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': visibleDropdown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setVisibleDropdown(!visibleDropdown)}
          onBlur={() => setVisibleDropdown(false)}
        >
          <span>
            {!selectedUser
              ? 'Choose a user'
              : selectedUser.name}
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
              className={cn('dropdown-item',
                { 'is-active': selectedUser?.id === user.id })}
              onMouseDown={() => handleUserSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
