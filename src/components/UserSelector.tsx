import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  onUserSelect: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onUserSelect,
}) => {
  const [selectingUser, setSelectingUser] = useState(false);
  const [chosenUser, setChosenUser] = useState('Choose a user');

  const showDropdown = (isVisible: boolean) => {
    setSelectingUser(isVisible);
  };

  const handleUserSelection = useCallback((user: User) => {
    onUserSelect(user);
    setSelectingUser(false);
    setChosenUser(user.name);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        {
          'is-active': selectingUser,
        },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => showDropdown(true)}
          onBlur={() => showDropdown(false)}

        >
          <span>{chosenUser}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              href={`#${user.id}`}
              className={classNames(
                'dropdown-item',
                {
                  'is-active': chosenUser === user.name,
                },
              )}
              key={user.id}
              onMouseDown={() => handleUserSelection(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
