import React from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  users: User[];
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  isMenuOpen,
  setIsMenuOpen,
  selectedUser,
  setSelectedUser,
  users,
  setSelectedPost,
}) => {
  const handleClickButton = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickContent = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
    setIsMenuOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isMenuOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClickButton}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user, index) => (
            <a
              href={`#user-${index}`}
              key={user.id}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => handleClickContent(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
