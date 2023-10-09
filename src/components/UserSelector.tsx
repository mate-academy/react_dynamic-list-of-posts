import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getUsers } from '../api/users';
import { User } from '../types/User';

type Props = {
  chosenUser: User | null,
  onChangeUser: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({ chosenUser, onChangeUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const handleUserChange = (user: User) => {
    onChangeUser(user);
    setIsOpened(false);
  };

  const handleIsOpenedChange = () => {
    setIsOpened(prev => !prev);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpened,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleIsOpenedChange}
        >
          <span>
            {chosenUser ? chosenUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className="dropdown-item"
              onClick={() => handleUserChange(user)}
              key={user.id}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
