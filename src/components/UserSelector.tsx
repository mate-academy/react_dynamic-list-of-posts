import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
  onSelectPost: (post: Post | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onSelectUser,
  selectedUser,
  onSelectPost,
}) => {
  const [hiddenUsers, setHiddenUsers] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setHiddenUsers(prev => !prev);

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    setHiddenUsers(true);
    onSelectPost(null);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setHiddenUsers(true);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': !hiddenUsers })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
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
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
