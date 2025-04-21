import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { DropDownMenu } from './DropDownMenu';
import classNames from 'classnames';
import { Post } from '../types/Post';

type UserSelectorProps = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  // loadPosts: () => void;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
  // loadPosts,
}) => {
  const [openedDropDown, setOpenedDropDown] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
    setOpenedDropDown(false);
    // loadPosts();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event?.target as HTMLElement | null;

      if (target && !target.closest('.dropdown')) {
        setOpenedDropDown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openedDropDown]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': openedDropDown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpenedDropDown(!openedDropDown)}
        >
          {selectedUser ? (
            <span>{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <DropDownMenu
        openedDropDown={openedDropDown}
        users={users}
        selectedUser={selectedUser}
        handleUserSelect={handleUserSelect}
      />
    </div>
  );
};
