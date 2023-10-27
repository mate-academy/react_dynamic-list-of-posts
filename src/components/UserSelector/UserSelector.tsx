import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { AppContext } from '../AppContext';
import { User } from '../../types/User';

export const UserSelector: React.FC = React.memo(() => {
  const [showUsers, setShowUsers] = useState(false);
  const {
    users,
    selectedUser,
    setSelectedUser,
    setSelectedPost,
    setComments,
  } = useContext(AppContext);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowUsers(false);
    setSelectedPost(null);
    setComments([]);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': showUsers })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowUsers(!showUsers)}
        >
          <span>
            {!selectedUser
              ? 'Choose a user'
              : `${selectedUser.name}`}
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
              href={`#user${user.id}`}
              key={user.id}
              className={cn('dropdown-item', {
                'is-active': selectedUser && selectedUser.id === user.id,
              })}
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
