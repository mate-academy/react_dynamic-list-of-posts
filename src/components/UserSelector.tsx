import React, { useContext, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { UserContext } from './UsersContext';
import { PostContext } from './PostContext';

export const UserSelector: React.FC = () => {
  const { users, selectedUser, setSelectedUser } = useContext(UserContext);

  const { setPosts, setSelectedPost } = useContext(PostContext);
  const [showUsers, setShowUsers] = useState(false);

  const userRef = useRef<HTMLDivElement>(null);

  const handleSelectingUser = (currUser: User) => {
    setSelectedUser(currUser);
    setShowUsers(false);
    setPosts([]);
    setSelectedPost(null);
  };

  const handleClickingOutside = (e: MouseEvent) => {
    if (userRef.current && !userRef.current.contains(e.target as Node)) {
      setShowUsers(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickingOutside);

    return () => removeEventListener('mousedown', handleClickingOutside);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showUsers })}
      ref={userRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowUsers(!showUsers)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              key={user.id}
              onMouseDown={() => handleSelectingUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
