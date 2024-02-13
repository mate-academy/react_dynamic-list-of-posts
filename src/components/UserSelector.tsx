/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUsers } from '../utils/api';
import { User } from '../types/User';

interface Props {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  choosedUser: User | null
  setChoosedUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserSelector: React.FC<Props> = ({
  users,
  setUsers,
  choosedUser,
  setChoosedUser,
  setIsOpened,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handlerClick = (currentUser: User) => {
    setIsOpened(false);
    setChoosedUser(currentUser);
    setIsActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          onBlur={() => {
            setTimeout(() => setIsActive(false), 100);
          }}
          onClick={() => setIsActive(currentActivation => !currentActivation)}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{choosedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              onClick={() => handlerClick(user)}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item',
                { 'is-active': user.id === choosedUser?.id })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
