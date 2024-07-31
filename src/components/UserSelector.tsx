import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { UsersList } from './UsersList';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  setSelectedUser,
  selectedUser,
  setSelectedPost,
}) => {
  const [isDrowdownOpened, setIsDropdownOpened] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDrowdownOpened })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpened(!isDrowdownOpened)}
        >
          {!selectedUser ? (
            <span>Choose a user</span>
          ) : (
            <span>{selectedUser.name}</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <UsersList
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setIsDropdownOpened={setIsDropdownOpened}
            setSelectedPost={setSelectedPost}
          />
        </div>
      </div>
    </div>
  );
};
