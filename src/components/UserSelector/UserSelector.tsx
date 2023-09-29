import React, { useState } from 'react';
import classNames from 'classnames';

import { usePosts } from '../../PostsContext';
import { User } from '../../types/User';

type Props = {
  users: User[],
};

export const UserSelector: React.FC<Props> = ({ users }) => {
  const {
    selectedUser,
    setSelectedUser,
    getAllUserPosts,
    setSelectedPost,
  } = usePosts();

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleUserSelect = (chosenUser: User) => {
    setSelectedUser(chosenUser);
    setIsDropdownActive(false);
    setSelectedPost(null);
    getAllUserPosts(chosenUser.id);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
        >
          <span>
            {selectedUser ? (
              selectedUser.name
            ) : (
              'Choose a user'
            )}
          </span>

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
          {users.map((user: User) => {
            return (
              <a
                href={`#user-${user.id}`}
                onClick={() => handleUserSelect(user)}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
