import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[] | null;
  handleChooseUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({ users, handleChooseUser }) => {
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [nameUser, setNameUser] = useState<string>('Choose a user');

  const handleShowListOfUsers = () => {
    setShowUsers(prev => !prev);
  };

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${showUsers ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleShowListOfUsers}
          onBlurCapture={() => {
            setTimeout(() => setShowUsers(false), 200);
          }}
        >
          <span>{nameUser}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      {users && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users?.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={`dropdown-item ${nameUser === user.name ? 'is-active' : ''}`}
                data-cy="UserSelectorItem"
                onMouseDown={e => {
                  e.preventDefault();
                  handleChooseUser(user);
                  setNameUser(user.name);
                  setShowUsers(false);
                }}
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
