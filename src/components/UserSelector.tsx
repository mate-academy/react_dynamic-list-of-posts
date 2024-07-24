import React, { useContext, useState } from 'react';
import { DispatchContext, StatesContext } from '../context/Store';
import classNames from 'classnames';

export const UserSelector: React.FC = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dispatch = useContext(DispatchContext);
  const { users, selectedUserId } = useContext(StatesContext);

  const handleOnSelectUser = (userId: number) => {
    dispatch({ type: 'SET_SELECTEDUSERID', payload: userId });
    setIsDropdownActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
        >
          <span>
            {selectedUserId
              ? users.find(user => user.id === selectedUserId)?.name
              : 'Choose a user'}
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
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUserId === user.id,
              })}
              key={user.id}
              onClick={() => handleOnSelectUser(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
