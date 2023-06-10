import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type SelectorUsers = {
  listOfUserf: User[],
  saveSelectedUser: (user: User) => void,
  choosenUser: User | null,
};

export const UserSelector: React.FC<SelectorUsers> = ({
  listOfUserf,
  saveSelectedUser,
  choosenUser,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
        >
          {choosenUser?.name
            ? (
              <p>{choosenUser.name}</p>
            ) : (
              <span>Choose a user</span>
            )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {true && (
          <div className="dropdown-content">
            {listOfUserf.map((user, idx) => (
              <a
                href={`#user=${idx + 1}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': user.id === choosenUser?.id },
                )}
                key={user.id}
                onClick={() => {
                  saveSelectedUser(user);
                  setIsActive(false);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
