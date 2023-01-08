import classNames from 'classnames';
import React, { useState } from 'react';
import { Errors } from '../types/Errors';
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: User | null,
  setSelectedUser: (user: User) => void,
  error: Errors,
  setSelectedPost: (post: Post | null) => void,
};

export const UserSelector: React.FC<Props> = ({
  users, selectedUser, setSelectedUser, error, setSelectedPost,
}) => {
  const [isOpenUsersList, setIsOpenUsersList] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpenUsersList(!isOpenUsersList)}
          disabled={error === Errors.USERS}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isOpenUsersList && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUser?.id === user.id },
                )}
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  setIsOpenUsersList(false);
                  setSelectedPost(null);
                }}
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
