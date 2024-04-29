import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  chosenUser: User['id'] | null;
  setChosenUser: (userId: User['id']) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  // chosenUser,
  setChosenUser,
}) => {
  const [usersListShown, setUsersListShown] = useState<boolean>(false);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setUsersListShown((currentValue: boolean) => !currentValue);
          }}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {usersListShown && (
          <div className="dropdown-content">
            {users.map((currentUser: User) => (
              <a
                key={currentUser.id}
                href={`#${currentUser.id}`}
                className="dropdown-item"
                onChange={() => setChosenUser(currentUser.id)}
              >
                {currentUser.name}
              </a>
            ))}
            {/* <a href="#user-1" className="dropdown-item">
            Leanne Graham
          </a>
          <a href="#user-2" className="dropdown-item is-active">
            Ervin Howell
          </a>
          <a href="#user-3" className="dropdown-item">
            Clementine Bauch
          </a>
          <a href="#user-4" className="dropdown-item">
            Patricia Lebsack
          </a>
          <a href="#user-5" className="dropdown-item">
            Chelsey Dietrich
          </a> */}
          </div>
        )}
      </div>
    </div>
  );
};
