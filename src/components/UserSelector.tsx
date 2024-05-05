import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../utils/GlobalStateProvider';
import { User } from '../types/User';
import cn from 'classnames';

export const UserSelector: React.FC = () => {
  const { users, selectedUser } = useContext(StateContext);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useContext(DispatchContext);

  const handleSelectingUser = (user: User) => {
    setIsDropdownOpened(false);
    dispatch({ type: 'setSelectedUser', payload: user });
  };

  useEffect(() => {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const handler = (e: any) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsDropdownOpened(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownOpened,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpened(prev => !prev)}
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
        ref={dropdownRef}
      >
        <div className="dropdown-content">
          {users?.map(user => (
            <a
              key={user.id}
              onClick={() => handleSelectingUser(user)}
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
