import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import classNames from 'classnames';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { users, selectedUser } = state;
  const { user: targetUser } = selectedUser;
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const handleSelectUser = (user: User) => {
    dispatch({ type: 'OPEN_SIDEBAR', payload: false });
    dispatch({ type: 'WRITING_COMMENT_STATUS', payload: false });

    dispatch({ type: 'SELECT_USER', payload: user });
  };

  const handleDropdownClick = () => {
    setDropdownOpened(!dropdownOpened);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': dropdownOpened,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownClick}
          onBlur={handleDropdownClick}
        >
          <span>{targetUser ? targetUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === targetUser?.id,
              })}
              key={user.id}
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
