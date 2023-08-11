import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { User } from '../types/User';
import { getUsers } from '../api/ApiMethods';

type Props = {
  setSelectUser: (v: User) => void,
  selectUser: User | null,
};

export const UserSelector: React.FC<Props> = ({
  setSelectUser,
  selectUser,
}) => {
  const [allUsers, setAllUsers] = useState<null | User[]>(null);
  const [dropdownTrigger, setDropdownTrigger] = useState(true);

  const handleTrigger = () => {
    setDropdownTrigger(prev => !prev);
  };

  const handleSelect = (user: User) => {
    setSelectUser(user);
    setDropdownTrigger(true);
  };

  useEffect(() => {
    getUsers().then(users => setAllUsers(users));
  }, []);

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
          onClick={handleTrigger}
        >
          <span>{selectUser ? selectUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content" hidden={dropdownTrigger}>
          {allUsers?.map(user => (
            <a
              href={`#user-${user.id}`}
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectUser?.id,
              })}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
