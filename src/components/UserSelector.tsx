import React, { useContext, useState } from 'react';
import { User } from '../types/User';
import { InitialContext } from './ToDoContext';

type Props = {
  users: User[];
};

export const UserSelector = ({ users }: Props) => {
  const [showUsers, setShowUsers] = useState(false);
  const { selectedUser, setSelectedUser } = useContext(InitialContext);

  const HandleSelectedUser = (
    event: React.MouseEvent<HTMLAnchorElement>,
    user: User,
  ) => {
    setSelectedUser(user);
    event.preventDefault();
    setShowUsers(false);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setShowUsers(!showUsers);
          }}
        >
          {selectedUser ? selectedUser.name : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {showUsers &&
            users.map(user => (
              <a
                href={`#user-${user.id}`}
                key={user.id}
                className="dropdown-item"
                onClick={event => HandleSelectedUser(event, user)}
              >
                {user.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
