import React, { useContext } from 'react';
import { Users } from './Users';
import { PostsContext } from '../services/Store';
import classNames from 'classnames';

export const UserSelector: React.FC = () => {
  const { users, selectedUserId, showUsers, setShowUsers } =
    useContext(PostsContext);

  let selectedUser;

  if (selectedUserId) {
    selectedUser = users.find(user => user.id === selectedUserId);
  }

  return (
    <div
      data-cy="UserSelector"
      onClick={() => setShowUsers(true)}
      className={classNames('dropdown', {
        'is-active': showUsers,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            {selectedUser && selectedUserId
              ? selectedUser.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {' '}
          <Users />
        </div>
      </div>
    </div>
  );
};
