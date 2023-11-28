import classNames from 'classnames';

import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (selectedUser: User) => void;
  setSelectedPost: (SelectedPost: null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  setSelectedPost,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleButtonMenuClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': showMenu },
      )}
      ref={menuRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleButtonMenuClick}
        >
          <span>
            {selectedUser ? (
              `${selectedUser.name}`
            ) : (
              'Choose a user'
            )}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const handleUserClick = () => {
              setSelectedUser(user);
              setShowMenu(false);

              if (selectedUser !== user) {
                setSelectedPost(null);
              }
            };

            const isActiveClass = {
              'is-active': selectedUser && selectedUser.id === user.id,
            };

            return (
              <a
                href={`#user-${user.id}`}
                className={classNames(
                  'dropdown-item',
                  isActiveClass,
                )}
                key={user.id}
                role="menuitem"
                onClick={handleUserClick}
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
