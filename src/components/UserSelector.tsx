import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { getUsers } from '../utils/posts';
import { User } from '../types/User';
import { PostContext } from '../PostsProvider';

export const UserSelector: React.FC = () => {
  const {
    setError,
    setSelectedUser,
    selectedUser,
  } = useContext(PostContext);

  const [users, setUsers] = useState<User[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserSelection = (user: User) => {
    setSelectedUser(user);
    setIsMenuOpen(false);
  };

  const handleMenuOpen = () => {
    if (isMenuOpen === true) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    setError(null);
    getUsers()
      .then((usersFromServer) => {
        setUsers((prevUsers) => [...prevUsers, ...usersFromServer]);
      })
      .catch(() => {
        setError('Something went wrong');
      });
  }, [setError]);

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
          onClick={handleMenuOpen}
        >
          {!selectedUser && <span>Choose a user</span>}
          {selectedUser && <span>{selectedUser.name}</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              return (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  onClick={() => handleUserSelection(user)}
                  className={cn('dropdown-item',
                    { 'is-active': selectedUser?.id === user.id })}
                >
                  {user.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
