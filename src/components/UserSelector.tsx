import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[],
  onChange: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({ users, onChange }) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [currUser, setCurrUser] = useState<string>('Choose a user');
  const selectRef = useRef(null);

  const handleDropdownMenu = () => {
    setIsMenuOpened(state => !state);
  };

  const handleChooseUser = (user: User) => {
    handleDropdownMenu();
    setCurrUser(user.name);
    onChange(user);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target !== selectRef.current && isMenuOpened) {
      setIsMenuOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpened]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isMenuOpened,
      })}
      role="presentation"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownMenu}
        >
          <span>{currUser}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': name === currUser,
                })}
                onClick={() => handleChooseUser(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
