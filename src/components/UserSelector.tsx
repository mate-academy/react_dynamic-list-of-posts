import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';

interface Props {
  users: User[],
  selectUserId: (userId: number) => void,
  selectedUserId: number,
  selectPost: (post: Post | null) => void,
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectUserId,
  selectedUserId,
  selectPost,
}) => {
  const [isVisible, setIsVisible] = useState(false);

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
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isVisible && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUserId,
                })}
                onClick={() => {
                  selectUserId(user.id);
                  setIsVisible(false);
                  selectPost(null);
                }}
              >
                {user.name}
              </a>
            ))}
            <a href="#user-1" className="dropdown-item">Leanne Graham</a>
            <a href="#user-2" className="dropdown-item is-active">
              Ervin Howell
            </a>
            <a href="#user-3" className="dropdown-item">Clementine Bauch</a>
            <a href="#user-4" className="dropdown-item">Patricia Lebsack</a>
            <a href="#user-5" className="dropdown-item">Chelsey Dietrich</a>
          </div>
        </div>
      )}
    </div>
  );
};
