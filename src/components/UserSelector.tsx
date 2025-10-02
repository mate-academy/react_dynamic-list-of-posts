import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  chosenUser: User | null;
  onSelect: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  chosenUser,
  onSelect,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleSelect = (user: User) => {
    onSelect(user);
    setIsPressed(false);
  };

  return (
    <div
      className={classNames('dropdown', { 'is-active': isPressed })}
      data-cy="UserSelector"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsPressed(!isPressed)}
          onBlur={() => setIsPressed(false)}
        >
          {chosenUser === null ? (
            <span>Choose a user</span>
          ) : (
            <span>{chosenUser.name}</span>
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
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': chosenUser?.id === user.id,
              })}
              key={user.id}
              onMouseDown={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
