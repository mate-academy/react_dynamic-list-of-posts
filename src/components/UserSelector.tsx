import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import useClickOutside from '../hooks/useClickOutside';
import { UserItem } from './UserItem';

type Props = {
  currentUser: User | null,
  setCurrentUser: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  currentUser,
  setCurrentUser,
}) => {
  const { ref, isOpened, setIsOpened } = useClickOutside(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleToggleOpenAction = () => {
    setIsOpened(prevState => !prevState);
  };

  return (
    <div
      ref={ref}
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpened,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleOpenAction}
        >
          <span>
            {currentUser ? (
              currentUser.name
            ) : (
              'Choose a user'
            )}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpened && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <UserItem
                user={user}
                key={user.id}
                setIsOpened={setIsOpened}
                setCurrentUser={setCurrentUser}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
