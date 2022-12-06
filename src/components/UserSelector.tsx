import React, { useState } from 'react';
import classNames from 'classnames';

import { User } from '../types/User';

type Props = {
  usersArray: User[] | [],
  selectedUser: string,
  setSelectedUser: (userId: string) => void,
  setIsLoadingUserPosts: (load: boolean) => void,
};

export const UserSelector: React.FC<Props> = ({
  usersArray,
  selectedUser,
  setSelectedUser,
  setIsLoadingUserPosts,
}) => {
  const [dropDown, setDropDown] = useState(false);

  const selectedUserName = selectedUser
    ? usersArray[+selectedUser - 1].name
    : 'Choose a user';

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': dropDown,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropDown(!dropDown)}
        >
          <span>{selectedUserName}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersArray.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': +selectedUser === user.id,
              })}
              onClick={() => {
                setIsLoadingUserPosts(true);
                setSelectedUser(`${user.id}`);
                setDropDown(false);
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
