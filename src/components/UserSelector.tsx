import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import { DispatchContext, StateContext } from '../management/StateContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { users, currentUser } = useContext(StateContext);

  const [showUsers, setShowUsers] = useState(false);

  const handleClickSelect = () => {
    setShowUsers(!showUsers);
  };

  const getSelectedUser = (user: User) => {
    setShowUsers(false);
    dispatch({ type: 'currentUser', payload: user });
    dispatch({ type: 'openComments', payload: false });
  };

  const handleBlurSelect = () => {
    setShowUsers(false);
  };

  return (
    <div
      data-cy="UserSelector"
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
          onClick={handleClickSelect}
          onBlur={handleBlurSelect}
        >
          {currentUser ? (
            <span>{currentUser.name}</span>
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
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': currentUser && currentUser.id === user.id,
              })}
              onMouseDown={() => getSelectedUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
