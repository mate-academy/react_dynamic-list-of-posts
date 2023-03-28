import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';

type Props = {
  users: User[];
  getPostsById: (id:number) => void;
  setSelectPost: (post:Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  getPostsById,
  setSelectPost,
}) => {
  const [isActive, setActive] = useState(false);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleSelectUser = (user:User) => {
    setSelectUser(user);
    setActive(false);
    getPostsById(user.id);
    setSelectPost(null);
  };

  const handleBlur = () => {
    if (dropdownRef.current
      && dropdownRef.current.classList.contains('is-active')) {
      dropdownRef.current.classList.remove('is-active');
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isActive },
      )}
      onBlur={handleBlur}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggle}
        >
          <span>
            {selectUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': user.name === selectUser?.name },
              )}
              key={user.id}
              onMouseDown={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
