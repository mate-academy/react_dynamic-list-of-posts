import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({ users, selectedUser }) => {
  const [isUsersShown, setIsUsersShown] = useState(true);
  const [userSelected, setUserSelected] = useState<User | null>(null);

  // const showUsers = () => {};
  const handleSelectionOfUser = (user: User) => {
    setUserSelected(user);
    setIsUsersShown(true);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsUsersShown(!isUsersShown)}
        >
          {userSelected ? userSelected.name : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {!isUsersShown && (
          <div className="dropdown-content">
            {users.slice(0, 10).map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': userSelected === user,
                })}
                key={user.id}
                onClick={() => {
                  handleSelectionOfUser(user);
                  selectedUser(user);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
