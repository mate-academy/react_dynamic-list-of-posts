import React, { useState, useEffect, useContext } from 'react';
import { User as UserType } from '../types/User';
import { getAllUsers } from '../api/users';
import { ListContext } from './ListContext';
import { User } from './User';

export const UserSelector: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isUsersVisble, setIsUsersVisble] = useState(false);
  const {
    idUserActive,
    setSelectedPost,
    setIdUserActive,
  } = useContext(ListContext);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleUserClick = (userId: number) => {
    if (userId !== idUserActive) {
      setIdUserActive(userId);
      setSelectedPost({
        id: -1,
        userId: -1,
        title: '',
        body: '',
      });
    }

    setIsUsersVisble(!isUsersVisble);
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
          onClick={() => setIsUsersVisble(!isUsersVisble)}
        >
          <span>
            {
              idUserActive !== -1 ? (
                users.find(user => user.id === idUserActive)?.name
              ) : (
                'Choose a user'
              )
            }
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isUsersVisble && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {
              users.map(user => (
                <User
                  user={user}
                  key={user.id}
                  selectUser={handleUserClick}
                  idUserActive={idUserActive}
                />
              ))
            }
          </div>
        </div>
      )}

    </div>
  );
};
