import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  setSelectedPost: (post: Post | null) => void;
  setPosts: (posts: Post[]) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  setSelectedPost,
  setPosts,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [areUsersVisible, setAreUsersVisible] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users').then(setUsers);
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setAreUsersVisible(false);
    setSelectedPost(null);
    setPosts([]);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': areUsersVisible })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setAreUsersVisible(!areUsersVisible)}
          onBlur={() => setAreUsersVisible(false)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': id === selectedUser?.id,
                })}
                onClick={() => handleSelectUser(user)}
                onMouseDown={event => event.preventDefault()}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
