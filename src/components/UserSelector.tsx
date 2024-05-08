import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { useUsers } from '../providers/UserProvider';
import classNames from 'classnames';
import { User } from '../types/User';
import { usePosts } from '../providers/PostProvider';

export const UserSelector: React.FC = () => {
  const [show, setShow] = useState(false);
  const { users, selectUser, selectedUser } = useUsers();
  const { selectPost } = usePosts();

  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropdown = (e: Event) => {
      if (
        e.target instanceof Element &&
        !dropdown.current?.contains(e.target)
      ) {
        setShow(false);
      }
    };

    window.addEventListener('click', closeDropdown);

    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  const toggleDropdown = () => setShow(prev => !prev);
  const handleSelectUser =
    (user: User) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      selectUser(user);
      selectPost(null);
      setShow(false);
    };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': show })}
      ref={dropdown}
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
          {users.map(u => (
            <a
              key={u.id}
              href={`#user-${u.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === u.id,
              })}
              onClick={handleSelectUser(u)}
            >
              {u.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
