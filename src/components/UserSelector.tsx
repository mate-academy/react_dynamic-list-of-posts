import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;

  onSelect: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
}) => {
  const dropdown = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const handleGlobalClick = useCallback((event: MouseEvent) => {
    if (dropdown.current) {
      if (!dropdown.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    }
  }, []);

  const addListeners = useCallback(() => {
    document.addEventListener('click', handleGlobalClick);
  }, [handleGlobalClick]);

  const removeListeners = useCallback(() => {
    document.removeEventListener('click', handleGlobalClick);
  }, [handleGlobalClick]);

  useEffect(() => {
    return () => {
      removeListeners();
    };
  }, [removeListeners]);

  useEffect(() => {
    if (isActive) {
      addListeners();
    } else {
      removeListeners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const selectUser = useCallback(
    (user: User) => {
      onSelect(user);
      setIsActive(false);
    },
    [onSelect],
  );

  return (
    <div
      ref={dropdown}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(prevValue => !prevValue)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        style={{
          boxSizing: 'border-box',
          maxHeight: '40vh',
          overflowY: 'auto',
        }}
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user === selectedUser,
              })}
              onClick={() => {
                selectUser(user);
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
