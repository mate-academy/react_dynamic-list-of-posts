import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

interface Props {
  users: User[];
  selectedUser: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post>>;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownContent: React.RefObject<HTMLDivElement> = useRef(null);

  const handleOpenDropdown = () => setIsDropdownOpen(true);

  const handleCloseDropdown = () => setIsDropdownOpen(false);

  const handleSelectedUser = (user: User) => {
    setSelectedUser(user);
    handleCloseDropdown();
    setSelectedPost({
      id: 0,
      userId: 0,
      title: '',
      body: '',
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContent.current &&
        !dropdownContent.current.contains(event.target as Node)
      ) {
        handleCloseDropdown();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenDropdown}
        >
          <span>{selectedUser.id ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content" ref={dropdownContent}>
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser.id,
              })}
              onClick={() => handleSelectedUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
