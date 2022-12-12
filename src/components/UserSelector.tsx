import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  setSelectedUser: (user: User) => void;
  userSelect: User[];
  selectedUser: User | null;
  fetchPosts: (id: number) => void;
  setIsPostsLoading: (value: boolean) => void;
  setPostIdComments: (val: null) => void;
};

export const UserSelector: React.FC<Props> = ({
  setSelectedUser,
  userSelect,
  selectedUser,
  fetchPosts,
  setIsPostsLoading,
  setPostIdComments,
}) => {
  const [isSelectorActive, setIsSelectorActive] = useState(false);

  // const handleSelectorBlur = () => {
  //   setIsSelectorActive(false);
  // };

  const handleDropdownClick
  = () => {
    setIsSelectorActive(!isSelectorActive);
  };

  const handleUserClick = async (user: User) => {
    setPostIdComments(null);
    setSelectedUser(user);
    setIsSelectorActive(false);
    setIsPostsLoading(true);
    await fetchPosts(user.id);
    setIsPostsLoading(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        ({ 'is-active': isSelectorActive }),
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownClick}
          // onBlur={handleSelectorBlur}
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
          {userSelect.map((user, index) => {
            return (
              <a
                key={user.id}
                style={{ display: isSelectorActive ? 'block' : 'none' }}
                data-user={user.id}
                href={`#user-${index + 1}`}
                onClick={() => handleUserClick(user)}
                className={classNames(
                  'dropdown-item',
                  ({ 'is-active': selectedUser === user }),
                )}
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
