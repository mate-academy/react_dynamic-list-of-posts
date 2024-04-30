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
    if (usersListShown) {
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('click', handleClick);
    }
  }, [usersListShown]);

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
          </div>
        }
      </div>
    </div>
  );
};
