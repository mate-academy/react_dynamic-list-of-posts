import React, { useEffect, useRef, useState } from 'react';
import { User } from '../../types/User';
import userListener from './UserListener';

type Props = {
  users: User[];
  showPosts: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({ users, showPosts }) => {
  const [isShowUsers, setIsShowUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);

  const handleClickUser = (user: User) => {
    setSelectedUser(user);
    setIsShowUsers(false);
    showPosts(user);
  };

  useEffect(userListener(
    listening,
    setListening,
    menuRef,
    setIsShowUsers,
  ));

  return (
    <div
      data-cy="UserSelector"
      ref={menuRef}
      className={`dropdown ${isShowUsers && 'is-active'}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsShowUsers(!isShowUsers);
          }}
        >
          <span>{`${!selectedUser ? 'Choose a user' : selectedUser.name}`}</span>

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
              className={`dropdown-item ${user.id === selectedUser?.id && 'is-active'}`}
              key={user.id}
              onClick={() => {
                handleClickUser(user);
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
