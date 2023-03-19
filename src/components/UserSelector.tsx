import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  users: User[],
  setUsersPost: (args: User) => void,
  setOpenedPost: (args: Post | null) => void,
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  users,
  setUsersPost,
  setOpenedPost,
}) => {
  const [isActiveButton, setIsActivebutton] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const setUserAndPosts = (user: User) => {
    if (selectedUser === user) {
      return;
    }

    setOpenedPost(null);
    setSelectedUser(user);
    setUsersPost(user);
  };

  const handleUserSelection = async (event: React.MouseEvent<HTMLAnchorElement>,
    user: User) => {
    event.preventDefault();
    setUserAndPosts(user);
    setIsActivebutton(false);
  };

  const handleIsActiveButton = () => setIsActivebutton(!isActiveButton);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current
      && !dropdownRef.current.contains(event.target as Node)) {
      setIsActivebutton(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames(
        'dropdown',
        { 'is-active': isActiveButton },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleIsActiveButton}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i
              className="fas fa-angle-down"
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.length > 0 && users.map((user) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': user.id === selectedUser?.id },
              )}
              onClick={(event) => handleUserSelection(event, user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
