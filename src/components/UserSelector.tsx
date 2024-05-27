import React, { useContext, useState } from 'react';
import { StateContext } from '../utils/Store';
import { UserComponent } from './UserComponent';
import classNames from 'classnames';

export const UserSelector: React.FC = () => {
  const state = useContext(StateContext);
  const { users, selectedUser } = state;
  const [isDropped, setIsDropped] = useState(false);

  const handleDropped = () => {
    if (isDropped) {
      setIsDropped(false);
    } else {
      setIsDropped(true);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropped })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          value={selectedUser?.name}
          onClick={handleDropped}
          onBlur={() => setIsDropped(false)}
        >
          {selectedUser ? (
            <span>{selectedUser?.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i
              className={classNames('fas', {
                'fa-angle-down': !isDropped,
                'fa-angle-up': isDropped,
              })}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {users.map(user => (
          <UserComponent
            user={user}
            key={user.id}
            setIsDropped={setIsDropped}
          />
        ))}
      </div>
    </div>
  );
};
