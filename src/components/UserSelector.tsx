import React, { useEffect, useRef, useState } from 'react';
import { DropDownMenu } from './DropDownMenu';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  setUserSelected: (user: User) => void;
  userSelected: User | null;
  usersFromServer: User[];
};

export const UserSelector: React.FC<Props> = ({
  setUserSelected,
  userSelected,
  usersFromServer,
}) => {
  const [showUsers, setShowUsers] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowUsers(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showUsers })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowUsers(prev => !prev)}
        >
          <span>{userSelected ? userSelected.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <DropDownMenu
        userSelected={userSelected}
        users={usersFromServer}
        setUserSelected={setUserSelected}
        setShowUsers={setShowUsers}
      />
    </div>
  );
};
