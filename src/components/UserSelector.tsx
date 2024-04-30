import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  chosenUser: User | null;
  setChosenUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  chosenUser,
  setChosenUser,
}) => {
  const [usersListShown, setUsersListShown] = useState<boolean>(false);

  const dropdownContainer = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    // If it's an outside click
    if (
      dropdownContainer.current &&
      !dropdownContainer.current.contains(event.target as Node)
    ) {
      setUsersListShown(false);
    }
  };

  useEffect(() => {
    // If list is shown
    if (usersListShown) {
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('click', handleClick);
    }
  }, [usersListShown]);

  // useEffect(() => {
  //   if (usersListShown) {
  //     document.addEventListener('click', function (event) {
  //     })
  //   }
  // }, [usersListShown])

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': usersListShown })}
      ref={dropdownContainer}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setUsersListShown(current => !current)}
        >
          <span>{chosenUser ? chosenUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {
          <div className="dropdown-content">
            {users.map((currentUser: User) => (
              <a
                key={currentUser.id}
                href={`#${currentUser.id}`}
                className={classNames('dropdown-item', {
                  'is-active': currentUser.id === chosenUser?.id,
                })}
                onClick={() => {
                  setChosenUser(currentUser);
                  setUsersListShown(false);
                }}
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
        }
      </div>
    </div>
  );
};
