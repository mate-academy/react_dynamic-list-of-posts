import React, { useContext } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { StateContext } from '../State/StateProvider';

type Props = {
  users: User[];
};

export const UserSelector: React.FC<Props> = ({ users }) => {
  const {
    setIsActiveDrop,
    isActiveDrop,
    setSelectedUser,
    selectedUser,
    setPosts,
  } = useContext(StateContext);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setPosts([]);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isActiveDrop })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActiveDrop(!isActiveDrop)}
          onBlur={() => setIsActiveDrop(false)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
                'is-active': user.id === selectedUser?.id,
              })}
              onMouseDown={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
