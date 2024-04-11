import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { User } from '../types/User';

interface Props {
  selectedUser: User | null;
  onUserSelection: (selectedUser: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onUserSelection,
}) => {
  const [usersFromServer, setUsersFromServer] = useState<User[]>([]);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getUsers();

      setUsersFromServer(usersData);
    };

    fetchData();
  }, []);

  const haddleButtonClick = () => {
    setIsPressed(!isPressed);
  };

  const handleSelection = (CurrentSelectedUser: User) => {
    onUserSelection(CurrentSelectedUser);
    setIsPressed(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsPressed(false);
    }, 300);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isPressed })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={haddleButtonClick}
          onBlur={handleBlur}
        >
          {!selectedUser ? (
            <span>Choose a user</span>
          ) : (
            <span>{selectedUser.name}</span>
          )}
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersFromServer.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser && selectedUser.id === user.id,
              })}
              onClick={() => handleSelection(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
