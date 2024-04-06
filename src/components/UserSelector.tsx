import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUser, getUsers } from '../api/users';
import { wait } from '../utils/fetchClient';
import { Error } from '../types/Error';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  setIsLoading: (isLoading: boolean) => void;
  setSelectedUser: (user: User | null) => void;
  selectedUser: User | null;
  setSelectedPost: (post: Post | null) => void;
  setErrorMessage: (error: Error | string) => void;
  setIsSidebarVisible: (visible: boolean) => void;
  setIsCommentFormVisible: (visible: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({
  setIsLoading,
  setSelectedUser,
  selectedUser,
  setSelectedPost,
  setErrorMessage,
  setIsSidebarVisible,
  setIsCommentFormVisible,
}) => {
  const [users, setUsers] = useState<User[] | null>([]);
  const [areUsersVisible, setAreUsersVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    getUsers()
      .then(usersFromServer => {
        wait(1000);
        setUsers(usersFromServer);
      })
      .catch(() => {
        setErrorMessage(Error.LoadingError);
      })
      .finally(() => setIsLoading(false));
  }, [setErrorMessage, setIsLoading]);

  const handleSelectUser = (currentUser: User) => {
    if (selectedUser && currentUser.id === selectedUser.id) {
      return;
    }

    setErrorMessage('');
    setIsCommentFormVisible(false);
    setSelectedPost(null);
    setIsSidebarVisible(false);
    setSelectedUser(currentUser);
    getUser(currentUser).catch(() => setErrorMessage(Error.LoadingError));
  };

  const handleUserListBlur = () => {
    setTimeout(() => {
      setAreUsersVisible(false);
    }, 200);
  };

  const handleButtonClick = () => {
    setAreUsersVisible(prevState => !prevState);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': areUsersVisible })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleButtonClick}
          onBlur={handleUserListBlur}
        >
          <span>{selectedUser ? `${selectedUser.name}` : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {users && (
          <div className="dropdown-content">
            {users.map((user: User) => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active':
                    selectedUser !== null && user.id === selectedUser.id,
                })}
                onClick={() => handleSelectUser(user)}
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
