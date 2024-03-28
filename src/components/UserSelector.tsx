import React, { useContext, useEffect, useState } from 'react';
import { getPosts, getUsers } from './todosApi/api-todos';
import { UserListContext } from './listContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [isDropdown, setIsDrobdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { users, setUsers, setPost, fetchUserComments, setIsLoader } =
    useContext(UserListContext);

  const useUserHandler = (userId: number) => {
    setIsLoader(true);
    if (userId) {
      getPosts(userId)
        .then(posts => {
          setPost(posts);
          posts.forEach(post => fetchUserComments(post.id));
        })
        .catch(() => {});
      setInterval(() => {
        setIsLoader(false);
      }, 1000);
      setIsDrobdown(false);
      const usersName = users.find(u => u.id === userId);

      setSelectedUser(usersName || null);
    }
  };

  const handleDropdown = () => {
    setIsDrobdown(prev => !prev);
  };

  function fetchUsers() {
    getUsers()
      .then(use => {
        setUsers(use);
      })
      .catch(() => {});
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      {isDropdown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {!users.length && (
              <a href="#user-2" className="dropdown-item is-active">
                Choose a user
              </a>
            )}

            {users.map(use => (
              <a
                href={`#${use.id}`}
                className="dropdown-item"
                key={use.id}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                onClick={() => useUserHandler(use.id)}
              >
                {use.name}
              </a>
            ))}

            {/* <a href="#user-2" className="dropdown-item is-active">
            Ervin Howell
          </a>
          <a href="#user-3" className="dropdown-item">
            Clementine Bauch
          </a>
          <a href="#user-4" className="dropdown-item">
            Patricia Lebsack
          </a>
          <a href="#user-5" className="dropdown-item">
            Chelsey Dietrich
          </a> */}
          </div>
        </div>
      )}
    </div>
  );
};
