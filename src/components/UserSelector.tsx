import React, { useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface Props {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  setSelectedPost: (post: Post | null) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSelect(user: User) {
    setSelectedUser(user);
    setSelectedPost(null);
    setIsOpen(false);
  }

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown', { 'is-active': isOpen })}
      tabIndex={0}
      onBlur={e => {
        const next = e.relatedTarget as Node | null;

        if (!dropdownRef.current?.contains(next)) {
          setIsOpen(false);
        }
      }}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prev => !prev)}
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
          {users.map((user: User) => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              key={user.id}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
