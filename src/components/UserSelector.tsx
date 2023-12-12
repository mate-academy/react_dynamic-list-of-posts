import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { getUsers } from '../services/user';
import { User } from '../types/User';

type Props = {
  onSelectedUser: (user: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  onSelectedUser,
  selectedUser,
}) => {
  const [isClickChoose, setIsClickChoose] = useState(false);

  const [users, setUsers] = useState<[] | User[]>([]);

  const textInfo = selectedUser
    ? selectedUser.name
    : 'Choose a user';

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isClickChoose })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsClickChoose(true)}
        >
          <span>
            {textInfo}
          </span>

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
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item',
                { 'is-active': selectedUser?.id === user.id })}
              onClick={() => {
                setIsClickChoose(false);
                onSelectedUser(user);
              }}
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
