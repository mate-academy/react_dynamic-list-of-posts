import React, { createRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { PostsContext } from '../context/postsContext';
import { User } from '../types/User';
import { Loader } from './Loader';
import { getUsers } from '../api/users.api';

export const UserSelector: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const {
    selectedUser,
    setSelectedUser,
    setSelectedPost,
    setErrorMessage,
  } = React.useContext(PostsContext);
  const dropdown = createRef<HTMLButtonElement>();

  const hideDropdown = React.useCallback((event: MouseEvent) => {
    if (!isDropdownActive) {
      return;
    }

    if (!dropdown.current?.contains(event.target as Node)) {
      setIsDropdownActive(false);
    }
  }, [isDropdownActive]);

  useEffect(() => {
    document.addEventListener('click', hideDropdown);

    return () => {
      document.removeEventListener('click', hideDropdown);
    };
  }, [isDropdownActive]);

  useEffect(() => {
    setLoading(true);

    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Cannot load users list.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          ref={dropdown}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          { loading && <Loader />}

          {!loading && users.length > 0 && users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => {
                setSelectedUser(user);
                setIsDropdownActive(false);
                setSelectedPost(null);
              }}
            >
              {user.name}
            </a>
          ))}

          {!loading && users.length === 0 && (
            <p className="dropdown-item">There are no users</p>
          )}
        </div>
      </div>
    </div>
  );
};
