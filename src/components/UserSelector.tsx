import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  isDropDownShown: boolean;
  setIsDropDownShown: (item: boolean) => void;
  users: User[];
  getPosts: (userId: number) => void;
  setIsUserSelected: (item: boolean) => void;
  setIsSideBarOpen: (item: boolean) => void;
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  isDropDownShown,
  setIsDropDownShown,
  users,
  getPosts,
  setIsUserSelected,
  setIsSideBarOpen,
  setSelectedPost,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    getPosts(user.id);
    setIsSideBarOpen(false);
    setIsUserSelected(true);
    setIsDropDownShown(false);
    setSelectedUser(user);
    setSelectedPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
      onBlur={() => setTimeout(() => setIsDropDownShown(false), 200)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropDownShown(!isDropDownShown)}
        >
          {!selectedUser && <span>Choose a user</span>}
          {selectedUser && <span>{selectedUser.name}</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isDropDownShown && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={cn('dropdown-item', {
                  'is-active': selectedUser && selectedUser.id === user.id,
                })}
                key={user.id}
                onClick={() => handleUserSelect(user)}
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
