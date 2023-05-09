import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[] | null;
  currUser: User | null;
  selectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users, currUser, selectUser,
}) => {
  const [isListShown, setListShown] = useState(false);

  const toggleList = () => {
    setListShown(!isListShown);
  };

  const hideList = () => {
    setTimeout(() => {
      setListShown(false);
    }, 100);
  };

  const handleUserClick = (user: User) => () => {
    selectUser(user);
    toggleList();
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleList}
          onBlur={hideList}
        >
          {!currUser && <span>Choose a user</span>}
          <span>{currUser?.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isListShown && (
        <ul className="dropdown-menu" id="dropdown-menu" role="menu">
          {users?.map(user => (
            <li key={user.id} className="dropdown-content">
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': currUser?.id === user.id },
                )}
                onClick={handleUserClick(user)}
              >
                {user.name}
              </a>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};
