import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/ClientFunctions';
import { User } from '../types/User';
import classNames from 'classnames';

interface Props {
  currUser: User | null;
  isDdActive: boolean;
  setPrevUser: (user: User | null) => void;
  setCurrUser: (user: User | null) => void;
  setIsDdActive: (value: boolean) => void;
}

export const UserSelector: React.FC<Props> = ({
  currUser,
  isDdActive,
  setPrevUser,
  setCurrUser,
  setIsDdActive,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  // #region handlers

  const buttonOnClickHandler = () => {
    if (isDdActive) {
      setIsDdActive(false);

      return;
    }

    setIsDdActive(true);
  };

  const selectUserHandler = (user: User) => {
    setPrevUser(currUser);
    setCurrUser(user);
  };

  // #endregion

  useEffect(() => {
    getUsers().then(_users => setUsers(_users));
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDdActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={buttonOnClickHandler}
        >
          <span>{currUser ? currUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { name, id } = user;

            return (
              <a
                href={`#user-${id}`}
                key={id}
                className={classNames('dropdown-item', {
                  'is-active': currUser?.id === id,
                })}
                onClick={() => selectUserHandler(user)}
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
