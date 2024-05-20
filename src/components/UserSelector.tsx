import React, { Dispatch, useRef, useState } from 'react';

import { Post } from '../types/Post';
import { User } from '../types/User';
import { useClickOutside } from '../hooks/useClickOutside';

interface Props {
  users: User[] | null;
  selectedUser: User | null;
  setSelectedUser: Dispatch<React.SetStateAction<User | null>>;
  setSelectedPost: Dispatch<React.SetStateAction<Post | null>>;
}

export const UserSelector: React.FC<Props> = ({
  setSelectedUser,
  selectedUser,
  users,
  setSelectedPost,
}) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleUserSelection = (user: User) => {
    setSelectedUser(user);
    setIsDropDownVisible(false);
    setSelectedPost(null);
  };

  const handleClickOutside = () => {
    setIsDropDownVisible(false);
  };

  useClickOutside(dropdownRef, handleClickOutside);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={`dropdown ${isDropDownVisible ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          onClick={() => setIsDropDownVisible(prev => !prev)}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map((user, idx) => (
            <a
              onClick={() => handleUserSelection(user)}
              key={user.id}
              href={`#user-${idx + 1}`}
              className={`dropdown-item ${selectedUser?.id === user.id ? 'is-active' : ''}`}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
