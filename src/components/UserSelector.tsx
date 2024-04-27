import React, { useContext, useState } from 'react';
import { ContextList } from './ListProvider/ListProvider';
import cn from 'classnames';

export const UserSelector: React.FC = () => {
  const { usersList, selectedUser, setSelectPost, handlePostsOfSelectUser } =
    useContext(ContextList);

  const [isActive, setIsActive] = useState(false);

  const handleDropdown = () => {
    setSelectPost(null);
    setIsActive(!isActive);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isActive })}
      onBlur={() => setIsActive(false)}
    >
      <div className="dropdown-trigger" onClick={handleDropdown}>
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersList.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onMouseDown={() => handlePostsOfSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
