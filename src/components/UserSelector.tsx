import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../api';
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  selectedUser: User | null,
  setSelectedUser: (user: User) => void,
  setErrorMessage: (error: string) => void,
  setUsersAreLoaded: (b: boolean) => void,
  setSelectedPost: (post: Post | null) => void,
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  setErrorMessage,
  setUsersAreLoaded,
  setSelectedPost,
}) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const loadUsers = async () => {
    setIsLoading(true);

    try {
      const response = await getUsers();

      setUsers(response);
      setUsersAreLoaded(true);
    } catch {
      setErrorMessage('Unable to load users!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handlerSelectUser = (user: User) => {
    setSelectedPost(null);
    setSelectedUser(user);
    setShowMenu(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className={classNames('button', {
            'is-loading': isLoading,
          })}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowMenu(!showMenu)}
        >
          {selectedUser
            ? (
              <span>{selectedUser.name}</span>
            ) : (
              <span>Choose a user</span>
            )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {(showMenu && users) && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href="#user-1"
                className="dropdown-item"
                key={user.id}
                onClick={() => handlerSelectUser(user)}
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
