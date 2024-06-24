import React, { useContext, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { InitialContext } from './ToDoContext';
import classNames from 'classnames';
import { getUsers } from '../utils/sevicePosts';

type Props = {
  users: User[];
};

export const UserSelector = ({ users }: Props) => {
  const [showUsers, setShowUsers] = useState(false);
  const { selectedUser, setSelectedUser, setSelectedPost, setUsers } =
    useContext(InitialContext);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const HandleSelectedUser = (
    event: React.MouseEvent<HTMLAnchorElement>,
    user: User,
  ) => {
    setSelectedUser(user);
    setSelectedPost(null);
    event.preventDefault();
    setShowUsers(false);
  };

  const selectorRef = useRef<HTMLDivElement>(null);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
      ref={selectorRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setShowUsers(!showUsers);
          }}
        >
          {selectedUser ? selectedUser.name : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {showUsers &&
            users.map(user => (
              <a
                href={`#user-${user.id}`}
                key={user.id}
                className={classNames('dropdown-item', {
                  'is-active': showUsers,
                })}
                onClick={event => HandleSelectedUser(event, user)}
              >
                {user.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
