import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [isActiveUserList, setIsActiveUserList] = useState<boolean>(false);

  const hendlerLinkUser = (idSelectedUser: number): void => {
    setSelectedUser(users.find(({ id }) => id === idSelectedUser) || null);
    setIsActiveUserList(false);
  };

  const isActiveUser = (id: number): boolean => {
    if (selectedUser?.id === id) {
      return true;
    }

    return false;
  };

  const hendlerActiveList = (): void => {
    setIsActiveUserList(state => !state);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isActiveUserList },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={hendlerActiveList}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(({ id, name }) => (
            <a
              key={id}
              href={`#user-${id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': isActiveUser(id) },
              )}
              onClick={() => hendlerLinkUser(id)}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
