import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { PostsContext } from '../PostsContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    setSelectedPost,
  } = useContext(PostsContext);
  const [isSelectActive, setIsSelectActive] = useState(false);

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setIsSelectActive(false);
    setSelectedPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isSelectActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onBlur={() => setIsSelectActive(false)}
          onClick={() => setIsSelectActive(currSelect => !currSelect)}
        >
          <span>
            {selectedUser ? (
              selectedUser.name
            ) : (
              'Choose a user'
            )}
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
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onMouseDown={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
