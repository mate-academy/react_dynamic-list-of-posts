import { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import { UsersContext } from '../context/UsersContext';
import { getUsers } from '../api/users';
import { ErrorContext } from '../context/ErrorContext';

export const UserSelector: React.FC = () => {
  const {
    users, setUsers, user, setUser,
  } = useContext(UsersContext);
  const { setIsErrorHappen } = useContext(ErrorContext);

  const [isUsersOpen, setIsUsersOpen] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setIsErrorHappen(true));
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
          onClick={() => setIsUsersOpen(prev => !prev)}
        >
          <span>
            {!user ? 'Choose a user' : user.name }
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isUsersOpen && (
        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
          onBlur={() => setIsUsersOpen(false)}
        >
          <div className="dropdown-content">
            {users.map(currentUser => {
              const { id, name } = currentUser;

              return (
                <a
                  key={id}
                  href={`#user-${id}`}
                  className={classnames(
                    'dropdown-item', {
                      'is-active': id === user?.id,
                    },
                  )}
                  onClick={() => {
                    setIsUsersOpen(prev => !prev);
                    setUser(currentUser);
                  }}
                >
                  {name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
