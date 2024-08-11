import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/user';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  selectedUser?: User | null;
  setSelectedUser: (user: User | null) => void;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [user, setUser] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers().then(setUser);
  }, []);

  const activeUser = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isLoading })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={activeUser}
          onBlur={() => setIsLoading(false)}
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
          {user.map(users => (
            <a
              key={users.id}
              href={`#user-${users.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === users.id,
              })}
              onMouseDown={() => {
                setSelectedPost(null);
                setIsLoading(false);
                setSelectedUser(users);
              }}
            >
              {users.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
