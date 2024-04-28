import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../context/ContextReducer';
import cn from 'classnames';
import { User } from '../../types/User';

export const UserSelector: React.FC = () => {
  const { Users, Dropdown, UserId } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleSelectClick = () => {
    dispatch({ type: 'unsetUsers' });
    dispatch({ type: 'Dropdown-active-disable' });
  };

  const handleUserClick = (user: User) => {
    dispatch({ type: 'Dropdown-active-disable' });
    dispatch({ type: 'setUserId', userId: user.id });
    dispatch({ type: 'closePostDetails' });
  };

  const nameOfUser = Users.find(user => user.id === UserId);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown is-active', { 'is-active': Dropdown })}
    >
      <div className="dropdown-trigger">
        <button
          onClick={handleSelectClick}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          {UserId === 0 ? (
            <span>Choose a user</span>
          ) : (
            <span>{nameOfUser?.name}</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {Dropdown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {Users.map(user => (
              <a
                onClick={() => handleUserClick(user)}
                key={user.id}
                href="#user-1"
                className="dropdown-item"
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
