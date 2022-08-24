import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

type Props = {
  userID: number;
  setUserID: (id: number) => void;
};

export const UserSelector: React.FC<Props> = (props) => {
  const [dropdownState, setDropdownState] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const { userID, setUserID } = props;

  useEffect(() => {
    client.get<User[]>('/users')
      .then(res => setUsers(res.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }))));
  }, []);

  const userToWorkWith = users.find(user => user.id === userID) || null;

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdownState })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdownState(state => !state)}
        >
          {userToWorkWith === null
            ? <span>Choose a user</span>
            : <span>{userToWorkWith.name}</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div
          className="dropdown-content"
        >
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': userID === user.id },
              )}
              onClick={() => {
                setUserID(user.id);
                setDropdownState(state => !state);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
