import classNames from 'classnames';
import React, { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  users: User[],
  setUsersPost: (arg: User) => void,
  setOpenedPost: (arg: Post | null) => void,
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  users,
  setUsersPost,
  setOpenedPost,
}) => {
  const [isActiveButton, setIsActivebutton] = useState(false);
  const closeDropDown = () => {
    setIsActivebutton(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeDropDown });

  const setUserAndPosts = (user: User) => {
    if (selectedUser === user) {
      return;
    }

    setOpenedPost(null);
    setSelectedUser(user);
    setUsersPost(user);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isActiveButton },
      )}
      ref={ref}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActivebutton(!isActiveButton)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.length > 0 && users.map((user) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': user.id === selectedUser?.id },
              )}
              onClick={async (event) => {
                event.preventDefault();
                setUserAndPosts(user);
                setIsActivebutton(false);
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
