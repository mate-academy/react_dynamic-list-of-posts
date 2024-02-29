import React, { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import { getUsers } from '../utils/User';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  setUsers: (users: User[]) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  setUsers,
  selectedUser,
  setSelectedUser,
  setIsSidebarOpen,
  setSelectedPost,
}) => {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getUsers().then(items => {
      setUsers(items);
    });
  }, [setUsers]);

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsActive(true);
  };

  const handleChooseUser = (user: User) => {
    setSelectedUser(user);
    setIsActive(false);
    setIsSidebarOpen(false);
    setSelectedPost(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
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
      className={cn('dropdown', { 'is-active': isActive })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={event => handleClickBtn(event)}
        >
          <span>{!selectedUser ? 'Choose a user' : selectedUser.name}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className="dropdown-item"
              onClick={() => handleChooseUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
