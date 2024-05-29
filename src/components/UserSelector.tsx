import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

interface Props {
  currentUser: null | User;
  users: User[];
  setCurrentUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  currentUser,
  users,
  setCurrentUser,
}) => {
  const [dropdownMenuVisible, setDropdownMenuVisible] = useState(false);

  const handlerOnClickButton = () => {
    setDropdownMenuVisible(current => !current);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDropdownMenuVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const setUser = (user: User) => {
    setCurrentUser(user);
    setDropdownMenuVisible(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': dropdownMenuVisible })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handlerOnClickButton}
        >
          <span>{currentUser ? currentUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={cn('dropdown-item', {
                  'is-active': id === currentUser?.id,
                })}
                onClick={() => setUser(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
