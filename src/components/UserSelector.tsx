import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type UsersList = {
  usersFromServer: User[];
  activeUser: number;
  onUser: (value: number) => void;
};

export const UserSelector: React.FC<UsersList> = ({
  usersFromServer,
  activeUser,
  onUser,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  const handleDropdownList = () => {
    return !isOpen ? setIsOpen(true) : setIsOpen(false);
  };

  const handleUser = (userid: number, userFullName: string) => {
    onUser(userid);
    setUserName(userFullName);
  };

  return (
    <>
      <div
        data-cy="UserSelector"
        className={classNames('dropdown', {
          'is-active': isOpen,
        })}
        onClick={handleDropdownList}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            {userName === '' ? (
              <span>Choose a user</span>
            ) : (
              <span>{userName}</span>
            )}
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>

        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {usersFromServer.map(item => (
              <a
                href={`#user-${item.id}`}
                key={item.id}
                className={classNames('dropdown-item', {
                  'is-active': item.id === activeUser,
                })}
                onClick={() => {
                  handleUser(item.id, item.name);
                }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
