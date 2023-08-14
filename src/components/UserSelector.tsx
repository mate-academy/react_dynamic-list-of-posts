import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  users: User[],
  selectedUser: User | null,
  onSetSelectedUser: (state: User | null) => void,
  onSetSelectedPost: (state: Post | null) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSetSelectedUser,
  onSetSelectedPost,
}) => {
  const [isShowingUsers, setIsShowingUsers] = useState(false);

  const handlerSelectUser = (e: React.MouseEvent, user: User) => {
    e.preventDefault();

    setIsShowingUsers(false);
    onSetSelectedUser(user);
    onSetSelectedPost(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown', { 'is-active': isShowingUsers },
      )}
      onBlur={() => setTimeout(() => setIsShowingUsers(false), 100)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsShowingUsers(!isShowingUsers)}
        >
          {selectedUser === null || selectedUser.name === ''
            ? (<span>Choose a user</span>)
            : (<span>{selectedUser.name}</span>)}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isShowingUsers && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': selectedUser?.id === user.id },
                )}
                onClick={(e) => handlerSelectUser(e, user)}
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
