import React from 'react';
import classNames from 'classnames';
import { usePostsContext } from '../Context/PostsContext';

export const UserSelector: React.FC = () => {
  const {
    users, handleClickOnUsers, selectedUserId, isActive, setIsActive,
  } = usePostsContext();
  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
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
            {!selectedUserId
              ? 'Choose a user'
              : selectedUser?.name}

          </span>

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
                key={id}
                href={`#user-${id}`}
                className={classNames('dropdown-item',
                  { 'is-active': selectedUserId === id })}
                onClick={() => handleClickOnUsers(id)}
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
