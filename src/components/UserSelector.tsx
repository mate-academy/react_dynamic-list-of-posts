import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { getUsers } from '../api/user';
import { AppContext } from './AppContext';
import { getPosts } from '../api/posts';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const {
    listVisible, setListVisible, users, setUsers, setLoadingPosts,
    setSelectedPost, setPosts, setPostsErrorMessage, selectedUser,
    setSelectedUser,
  } = useContext(AppContext);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownFocused, setDropdownFocused] = useState(false);

  useEffect(() => {
    if (!listVisible) {
      getUsers()
        .then(setUsers)
        .catch(error => {
          throw error;
        });
    }
  }, [listVisible, setUsers]);

  useEffect(() => {
    if (!dropdownFocused && listVisible) {
      setListVisible(false);
    }
  }, [dropdownFocused, listVisible, setListVisible]);

  const handleGetUsersClick = () => {
    setListVisible(!listVisible);
  };

  const handleGetUsersPosts = (user: User) => {
    setSelectedPost(null);
    setSelectedUser(user);
    setListVisible(false);
    setPostsErrorMessage(false);
    setLoadingPosts(true);

    getPosts(user.id)
      .then(posts => setPosts(posts))
      .catch((error) => {
        /* eslint-disable-next-line */
        console.error("Error fetching posts:", error);
        setPostsErrorMessage(true);
      })
      .finally(() => {
        setLoadingPosts(false);
      });
  };

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${listVisible && 'is-active'}`}
      ref={dropdownRef}
      onFocus={() => setDropdownFocused(true)}
      onBlur={() => setDropdownFocused(false)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleGetUsersClick}
        >
          <span>{`${selectedUser ? (selectedUser?.name) : 'Choose a user'}`}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item',
                { 'is-active': selectedUser?.id === user.id })}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevents blur event from firing before click event
                handleGetUsersPosts(user);
              }}

            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
