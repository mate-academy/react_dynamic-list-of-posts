import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { Context, DispatchContext } from '../Store';

export const UserSelector: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { users, selectedUser } = useContext(Context);
  const [focused, setFocused] = useState(false);

  const handleSelectUser = (user: User) => {
    dispatch({ type: 'setPosts', payload: null });
    dispatch({ type: 'setCurrentPost', payload: null });
    dispatch({ type: 'setComments', payload: null });
    dispatch({ type: 'setSelectedUser', payload: user });
    dispatch({ type: 'loaderPost', payload: true });
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
          className={cn('button', { 'is-active': focused })}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setFocused(!focused)}
          onBlur={() => {
            const timeout = setTimeout(() => {
              setFocused(!focused);
              clearTimeout(timeout);
            }, 380);
          }}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="false" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href="#user-1"
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
