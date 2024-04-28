import React, { useEffect, useContext } from 'react';
import { getUsers } from '../api/users';
import { UserComponent } from './userComponent';
import { UserContext } from '../contexts/userContext';
import classNames from 'classnames';

export const UserSelector: React.FC = () => {
  const { users, setUsers, isListOpen, setIsListOpen, chosenUser } =
    useContext(UserContext);

  useEffect(() => {
    getUsers().then(setUsers);
  }, [setUsers]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isListOpen })}
    >
      <div className="dropdown-trigger">
        <button
          onBlur={() => setIsListOpen(false)}
          onClick={() => setIsListOpen(!isListOpen)}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{chosenUser}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <UserComponent key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};
