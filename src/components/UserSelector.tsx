import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import classNames from 'classnames';

interface UserSelectorProps {
  responce: (error: string) => void;
  choosenUser: (id: number) => void;
}

export const UserSelector = ({ responce, choosenUser }: UserSelectorProps) => {
  const [showUsers, setShowUsers] = useState(false);
  const [clickedUser, setClickedUser] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  const changeShowUsers = () => {
    setShowUsers(!showUsers);
  };

  useEffect(() => {
    client
      .get<User[]>('/users')
      .then(currentUsers => {
        setUsers(currentUsers);
      })
      .catch(() => {
        responce('Something went wrong!');
        setTimeout(() => {
          responce('');
        }, 3000);

        return;
      });
  }, [responce]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showUsers })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={changeShowUsers}
          onBlur={() => setShowUsers(false)}
        >
          <span>
            {(clickedUser &&
              users.find(user => user.id === clickedUser)?.name) ||
              'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                href={`#user-${user.id}`}
                className={classNames(`dropdown-item `, {
                  'is-active': user.id === clickedUser,
                })}
                onMouseDown={() => {
                  setClickedUser(user.id);
                  choosenUser(user.id);
                }}
                key={user.id}
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
