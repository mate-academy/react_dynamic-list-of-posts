import React, { useCallback, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';
type Props = {
  users: User[];
  selectedUser: User | null;
  onSelectedUser: (user: User) => void;
  setSelectedPost: (post: Post | null) => void;
};

export const UserSelector = React.memo<Props>(
  ({ users, selectedUser, onSelectedUser, setSelectedPost }) => {
    const [isActiveMenu, setIsActiveMenu] = useState(false);

    const handleButtonMenu = useCallback(() => {
      setIsActiveMenu(boolean => !boolean);
    }, []);

    const handleItemMenu = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>, user: User) => {
        event.preventDefault();
        onSelectedUser(user);
        setIsActiveMenu(false);
        setSelectedPost(null);
      },
      [],
    );

    const dropdown = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          dropdown.current &&
          !dropdown.current.contains(event.target as Node)
        ) {
          setIsActiveMenu(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div
        data-cy="UserSelector"
        className={classNames('dropdown', {
          'is-active': isActiveMenu,
        })}
        ref={dropdown}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={handleButtonMenu}
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
                href={`#${user.id}`}
                onClick={event => handleItemMenu(event, user)}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

UserSelector.displayName = 'UserSelector';
