import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import cn from 'classnames';
interface Props {
  users: User[];
  selectUser: User | null;
  onUser: (user: User) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectUser,
  onUser,
}) => {
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setToggleDropDown(curr => !curr);
  const chooseUser = (user: User) => {
    onUser(user);
    handleToggle();
  };

  useEffect(() => {
    if (toggleDropDown === false) {
      return;
    }

    const outsideClick = (e: MouseEvent) => {
      if (!dropDownRef.current) {
        return;
      }

      if (!dropDownRef.current.contains(e.target as Node)) {
        setToggleDropDown(false);
      }
    };

    if (toggleDropDown) {
      document.addEventListener('click', outsideClick);
    }

    return () => {
      document.removeEventListener('click', outsideClick);
    };
  }, [toggleDropDown]);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': toggleDropDown })}
      ref={dropDownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggle}
        >
          <span>{selectUser === null ? 'Choose a user' : selectUser.name}</span>

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
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectUser?.id === user.id,
              })}
              onClick={() => chooseUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
