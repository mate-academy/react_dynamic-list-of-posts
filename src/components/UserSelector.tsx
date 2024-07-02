import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelect: (selectedUser: User) => void;
  setSelectedPost: (selectedPost: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
  setSelectedPost,
}) => {
  const [isDropDown, setIsDropDown] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropDown })}
      onMouseLeave={() => setIsDropDown(false)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsDropDown(!isDropDown);
          }}
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

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <>
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                key={user.id}
                onClick={() => {
                  onSelect(user);
                  setSelectedPost(null);
                  setIsDropDown(false);
                }}
              >
                {user.name}
              </a>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
