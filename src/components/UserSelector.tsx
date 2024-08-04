import React, { useCallback, useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | null;
  setUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setUser,
}) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const triggerMenu = useCallback(
    () => setIsTriggered(trigger => !trigger),
    [],
  );

  const loseSelection = useCallback(() => setIsTriggered(false), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        loseSelection();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [loseSelection]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isTriggered })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={triggerMenu}
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
              href={`#user-${user.id}`}
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => {
                setUser(user);
                loseSelection();
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
