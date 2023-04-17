/* eslint-disable max-len */
import classNames from 'classnames';
import { useState } from 'react';
import { User } from '../types/User';

type Props = {
  usersList: User[],
  selectedUser: User | null,
  setSelectedUser: (user:User) => void,
};

export const UserSelector: React.FC<Props> = ({
  usersList,
  selectedUser,
  setSelectedUser,
}) => {
  const [isActiveList, setIsActiveList] = useState(false);

  const toggleActiveList = () => {
    setIsActiveList(!isActiveList);
  };

  const handleSelectedUser = (user: User) => {
    setSelectedUser(user);
    setIsActiveList(!isActiveList);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActiveList })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleActiveList}
        >
          { selectedUser
            ? <span>{selectedUser.name}</span>
            : <span>Choose a user</span> }

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        { isActiveList && (
          <div className="dropdown-content">
            {usersList.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className="dropdown-item"
                onClick={() => {
                  handleSelectedUser(user);
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
