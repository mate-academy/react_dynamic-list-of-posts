import React, { useEffect, useState } from 'react';
import * as userService from '../api/users';
import { User } from '../types/User';
import { Post } from '../types/Post';
type Props = {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLoadingPosts: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const UserSelector: React.FC<Props> = ({
  setLoader,
  setSelectedUser,
  setLoadingPosts,
  setPosts,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState('Choose a user');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoadingPosts(true);
    userService
      .getUsers()
      .then(setUsers)
      .catch(() => {})
      .finally(() => {
        setLoadingPosts(false);
      });
  }, [setLoadingPosts]);

  const handleUserClick = (user: User) => {
    setCurrentUser(user.name);
    setIsOpen(false);
    setLoadingPosts(true);
    setPosts([]);
    setTimeout(() => {
      setLoader(false);
    }, 300);

    setLoader(true);
    setSelectedUser(user);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{currentUser}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className="dropdown-item"
                key={user.id}
                onClick={() => handleUserClick(user)}
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
