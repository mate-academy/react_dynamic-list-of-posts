import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type PropsType = {
  users: User[];
  selectUser: (
    user: User,
    setIsChoosing: (isChoosing: boolean) => void,
  ) => void;
  selectedUser: User;
};

export const UserSelector: React.FC<PropsType> = ({
  users,
  selectUser,
  selectedUser,
}) => {
  const [isChoosing, setIsChoosing] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsChoosing((state) => !state)}
        >
          {selectedUser.id !== 0
            ? (
              <span>{selectedUser.name}</span>

            )
            : (
              <span>Choose a user</span>

            )}
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isChoosing && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.length !== 0 && users.map(user => {
              const { id } = user;

              return (
                // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                <a
                  key={id}
                  href={`#user-${id}`}
                  className={classNames(
                    'dropdown-item',
                    { 'is-active': selectedUser.id === id },
                  )}
                  onClick={() => {
                    selectUser(user, setIsChoosing);
                  }}
                >
                  {user.name}
                </a>
              );
            })}
            {/* <a href="#user-1" className="dropdown-item">Leanne Graham</a>
            <a
              href="#user-2"
              className="dropdown-item is-active"
            >
              Ervin Howell
            </a>
            <a href="#user-3" className="dropdown-item">Clementine Bauch</a>
            <a href="#user-4" className="dropdown-item">Patricia Lebsack</a>
            <a href="#user-5" className="dropdown-item">Chelsey Dietrich</a> */}
          </div>
        </div>
      )}
    </div>
  );
};
