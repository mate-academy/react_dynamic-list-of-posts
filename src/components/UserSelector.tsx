import React, { useEffect, useRef } from 'react';
import { Users } from '../types/User';
import classNames from 'classnames';

export const UserSelector: React.FC<Users> = ({
  users,
  onListUser,
  showUser,
  onUserId,
  userId,
  setIsShowUsers,
}) => {
  const selectedUser = users.find(u => u.id === userId);
  const menuRef = useRef<HTMLDivElement>(null);

  /* eslint-disable @typescript-eslint/indent */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsShowUsers(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsShowUsers]);

  return (
    <div
      data-cy="UserSelector"
      ref={menuRef}
      className={classNames('dropdown', { 'is-active': showUser })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={onListUser}
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
              href={`#user-${u.id}`}
              className={classNames('dropdown-item', {
                'is-active': u.id === userId,
              })}
              key={u.id}
              onClick={() => {
                onUserId(u.id);
                onListUser();
              }}
            >
              {u.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
