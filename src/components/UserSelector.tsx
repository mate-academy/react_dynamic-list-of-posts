import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { User } from '../types/User';

type Props = {
  users: User[];
  user: User | null;
  onChangeUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  user,
  onChangeUser,
}) => {
  const [isOpen, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hadnleOutsideClick = (e: MouseEvent) => {
      if (dropDownRef.current
        && !dropDownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', hadnleOutsideClick);

    return () => {
      document.removeEventListener('click', hadnleOutsideClick);
    };
  }, [dropDownRef]);

  const onClickButton = () => {
    setOpen(state => !state);
  };

  const onClickUser = (newUser: User) => {
    onChangeUser(newUser);
    setOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isOpen },
      )}
      ref={dropDownRef}
    >
      <div className="dropdown-trigger">
        <button
          className="button"
          type="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={onClickButton}
        >
          <span>
            {user?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <ul className="dropdown-content">
          {users.map(currUser => (
            <li key={currUser.id}>
              <a
                href={`#user-${currUser.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': currUser.id === user?.id },
                )}
                onClick={() => onClickUser(currUser)}
              >
                {currUser.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
