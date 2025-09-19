import React, { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface Props {
  selectedUser: User | null;
  onCurrentPost: (post: Post | null) => void;
  onSelectedUser: (v: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  onSelectedUser,
  onCurrentPost,
  selectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => {
    setShowMenu(prev => !prev);
  };

  const getUsers = () => {
    return client.get<User[]>('/users').then(usr => usr);
  };

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showMenu })}
      onClick={handleToggle}
      onBlur={() => setShowMenu(false)}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{!selectedUser ? 'Choose a user' : selectedUser.name}</span>

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
              href={'#user-' + user.id}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onMouseDown={() => {
                onCurrentPost(null);
                onSelectedUser(user);
                setTimeout(() => setShowMenu(false), 0);
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
