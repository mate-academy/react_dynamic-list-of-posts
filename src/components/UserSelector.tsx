import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  currentUser: User | undefined;
  setCurrentPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const UserSelector: React.FC<Props> = ({
  setCurrentUser,
  currentUser,
  setCurrentPost,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeDropDown, setActiveDropDown] = useState(false);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('[data-cy="UserSelector"]')) {
        setActiveDropDown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': activeDropDown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setActiveDropDown(prev => !prev)}
        >
          <span>{currentUser ? currentUser.name : 'Choose a user'}</span>

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
              className={`dropdown-item ${currentUser?.id === user.id ? 'is-active' : ''}`}
              key={user.id}
              onClick={e => {
                e.stopPropagation();
                setCurrentUser(user);
                setCurrentPost(null);
                setActiveDropDown(false);
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
