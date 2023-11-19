import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getAllUsers } from '../api/users';
import { ListContext } from './ListContext';

export const UserSelector: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersVisble, setIsUsersVisble] = useState(false);
  const {
    idUserActive,
    setIdUserActive,
    setIsLoading,
    // setErrorMessagePosts,
  } = useContext(ListContext);

  useEffect(() => {
    getAllUsers().then(setUsers);
    // .catch(() => {
    //   setErrorMessagePosts('Something went wrong!');
    // });
  }, []);

  const handleUserClick = (userId: number) => {
    if (userId !== idUserActive) {
      setIdUserActive(userId);
      setIsLoading(true);
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
                <a
                  href={`#user-${user.id}`}
                  className={classNames('dropdown-item', {
                    'is-active': idUserActive === user.id,
                  })}
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                >
                  {user.name}
                </a>
              ))
            }
          </div>
        </div>
      )}

    </div>
  );
};
