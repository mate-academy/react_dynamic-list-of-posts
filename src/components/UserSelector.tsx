import React, { useContext, useEffect, useRef, useState } from 'react';
import { getPosts, getUsers } from './todosApi/api-todos';
import { UserListContext } from './listContext';

export const UserSelector: React.FC = () => {
  const [isDropdown, setIsDrobdown] = useState(false);
  const {
    users,
    setUsers,
    setPost,
    setIsLoader,
    setErrorPosts,
    selectedUser,
    setSelectedUser,
    setDetail,
  } = useContext(UserListContext);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectUser = (userId: number) => {
    setIsLoader(true);
    setPost([]);
    if (userId) {
      getPosts(userId)
        .then(posts => {
          setPost(posts);
        })
        .catch(() => {
          setErrorPosts(true);
        })
        .finally(() => {
          setIsLoader(false);
        });
      setDetail(false);

      setIsDrobdown(false);
      const usersName = users.find(user => user.id === userId);

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
      .then(user => {
        setUsers(user);
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
          {users.map(user => (
            <a
              href={`#${user.id}`}
              className={
                selectedUser && selectedUser.id === user.id
                  ? 'dropdown-item is-active'
                  : 'dropdown-item'
              }
              key={user.id}
              onClick={() => handleSelectUser(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
