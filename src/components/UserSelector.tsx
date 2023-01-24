import classNames from 'classnames';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { getPosts } from '../api/api';
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  users: User[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  setIsProcessing: Dispatch<SetStateAction<boolean>>;
  selectedUser: User | null;
  setSelectedUser: Dispatch<SetStateAction<User | null>>;
  setPostsError: Dispatch<SetStateAction<boolean>>;
  setSelectedPost: Dispatch<SetStateAction<Post | null>>;
};

export const UserSelector: React.FC<Props> = (
  {
    users,
    setPosts,
    setIsProcessing,
    selectedUser,
    setSelectedUser,
    setPostsError,
    setSelectedPost,
  },
) => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const handleDropdown = () => {
    setDropdownActive(
      (prevValue) => !prevValue,
    );
  };

  const handlePostsLoad = (id: number) => {
    setSelectedPost(null);
    setPostsError(false);
    handleDropdown();
    setIsProcessing(true);

    getPosts(id)
      .then(setPosts)
      .catch(() => setPostsError(true))
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdownActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdown}
        >
          <span>{selectedUser ? (selectedUser.name) : ('Choose a user')}</span>

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
              className={classNames(
                'dropdown-item',
                {
                  'is-active': user.id === selectedUser?.id,
                },
              )}
              onClick={() => {
                setSelectedUser(user);
                handlePostsLoad(user.id);
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
