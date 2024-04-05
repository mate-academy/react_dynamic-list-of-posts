import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUser, getUsers } from '../api/users';
import { wait } from '../utils/fetchClient';
import { Error } from '../types/Error';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  setLoading: (loading: boolean) => void;
  setSelectedUser: (user: User | null) => void;
  selectedUser: User | null;
  setSelectedPost: (post: Post | null) => void;
  setErrorMessage: (error: Error | '') => void;
  setIsSidebarVisible: (visible: boolean) => void;
  setIsNewCommentFormVisible: (visible: boolean) => void;
};

export const UserSelector: React.FC<Props> = ({
  setLoading,
  setSelectedUser,
  selectedUser,
  setSelectedPost,
  setErrorMessage,
  setIsSidebarVisible,
  setIsNewCommentFormVisible,
}) => {
  const [users, setUsers] = useState<User[] | null>([]);
  const [areUsersVisible, setAreUsersVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');
    getUsers()
      .then(usersFromServer => {
        wait(1000);
        setUsers(usersFromServer);
      })
      .catch(() => {
        setErrorMessage(Error.LoadingError);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelectUser = (currentUser: User) => {
    setErrorMessage('');
    setIsNewCommentFormVisible(false);
    setSelectedPost(null);
    setIsSidebarVisible(false);

    if (currentUser.id === selectedUser?.id) {
      return;
    }

    getUser(currentUser)
      .then(user => {
        setSelectedUser(user);
        setAreUsersVisible(false);
      })
      .catch(() => {
        setErrorMessage(Error.LoadingError);
      });
  };

  const handleUserListBlur = () => {
    setTimeout(() => {
      setAreUsersVisible(false);
    }, 200);
  };

  const handleButtonClick = () => {
    setAreUsersVisible(!areUsersVisible);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
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
      {users && areUsersVisible && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map((user: User) => {
              return (
                <a
                  href={`#${user.id}`}
                  key={user.id}
                  className={classNames('dropdown-item', {
                    'is-active': selectedUser?.id === user.id,
                  })}
                  onClick={() => handleSelectUser(user)}
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
