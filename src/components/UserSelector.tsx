/* eslint-disable no-console */
import classNames from 'classnames';
import { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[],
  setSelectedUserId: (id: number) => void,
  selectedUserId: number,
};

export const UserSelector: React.FC<Props> = ({
  users,
  setSelectedUserId,
  selectedUserId,
}) => {
  const [isMenuDropped, setIsMenuDropped] = useState(false);

  const selectUser = (user: User) => {
    console.log(user);

    if (user.id !== selectedUserId) {
      setSelectedUserId(user.id);
    }
  };

  console.log(selectedUserId);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isMenuDropped },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsMenuDropped(prev => !prev)}
          onBlur={() => setIsMenuDropped(false)}
        >

          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => {
            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUserId === user.id },
                )}
                onClick={() => {
                  console.log(user);
                  selectUser(user);
                }}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
