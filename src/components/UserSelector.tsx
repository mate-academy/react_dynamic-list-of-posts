import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { User } from '../types/User';
import { getUsers } from '../api/users';

type Props = {
  selectedUser: User | null;
  onChoose: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserSelector: React.FC<Props> = ({ selectedUser, onChoose }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropDown, setIsDropDown] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {});
  }, []);

  const handleIsDropDown = () => setIsDropDown(!isDropDown);

  const selectUser = (user: User) => () => {
    handleIsDropDown();
    onChoose(user);
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
          onClick={handleIsDropDown}
        >
          <span>
            {!selectedUser ? 'Choose a user' : selectedUser.name}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropDown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={cn(
                  'dropdown-item',
                  { 'is-active': selectedUser?.id === user.id },
                )}
                onClick={selectUser(user)}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
