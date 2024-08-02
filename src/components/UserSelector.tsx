import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import classNames from 'classnames';
import { getUsers } from '../services/user';

type Props = {
  selectedUser?: User | null;
  setSelectedUser: (user: User) => void;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const onActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={onActive}
          onBlur={() => setIsActive(false)}
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
          {users.map(user => {
            function handleMouseDown() {
              setSelectedUser(user);
              setIsActive(false);
              setSelectedPost(null);
            }

            return (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                key={user.id}
                onMouseDown={handleMouseDown}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
