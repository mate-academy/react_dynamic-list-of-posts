import React, { useContext, useEffect, useRef, useState } from 'react';
import { getPosts, getUsers } from './todosApi/api-todos';
import { UserListContext } from './listContext';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [isDropdown, setIsDrobdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { users, setUsers, setPost, fetchUserComments, setIsLoader } =
    useContext(UserListContext);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const useUserHandler = (userId: number) => {
    setIsLoader(true);
    if (userId !== undefined) {
      getPosts(userId)
        .then(posts => {
          setPost(posts);
          posts.forEach(post => fetchUserComments(post.id));
          setIsLoader(false);
        })
        .catch(() => {});
      setIsDrobdown(false);
      const usersName = users.find(u => u.id === userId);

      setSelectedUser(usersName || null);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDrobdown(false);
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
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={() => handleClickOutside}
      ref={dropdownRef}
      data-cy="UserSelector"
      className={isDropdown ? 'dropdown is-active' : 'dropdown'}
    >
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
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(use => (
            <a
              href={`#${use.id}`}
              className={
                selectedUser && selectedUser.id === use.id
                  ? 'dropdown-item is-active'
                  : 'dropdown-item'
              }
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
    </div>
  );
};
