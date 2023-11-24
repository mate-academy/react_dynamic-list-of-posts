import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { UserContext } from './UserContext';

export const UserSelector: React.FC = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
  } = useContext(UserContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setIsFocused(false);
  };

  const userInfoMsg = selectedUser ? selectedUser.name : 'Choose a user';

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isFocused })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsFocused(!isFocused)}
        >
          <span>{userInfoMsg}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div
          className="dropdown-content"
        >
          {users.map(user => (
            <a
              href={`#$user-${user.id}`}
              className={cn(
                'dropdown-item',
                { 'is-active': user.id === selectedUser?.id },
              )}
              key={user.id}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
