import classNames from 'classnames';
import React, { useState } from 'react';
import { IUser } from '../types/User';

interface Props {
  users: IUser[] | null;
  changeUser: (user: IUser) => void;
  activeUser: IUser | null;
}

const UserSelector: React.FC<Props> = (
  { users, changeUser, activeUser },
) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const changeIsOpen = () => setIsOpen(!isOpen);

  const chooseUser = (user: IUser) => {
    changeUser(user);
    setIsOpen(true);
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
          onClick={changeIsOpen}
        >
          {activeUser ? (
            <span>{activeUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

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
        <div className="dropdown-content" hidden={isOpen}>
          {users?.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item', { 'is-active': user.id === activeUser?.id },
              )}
              onClick={() => chooseUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserSelector);
