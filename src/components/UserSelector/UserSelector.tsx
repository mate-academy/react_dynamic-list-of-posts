import React, { useEffect, useRef } from 'react';
import { User } from '../../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  onClick: (user: User) => void;
  chosenUser: User | null;
  isFocused: boolean;
  onFocusElement: (state: boolean) => void;
  onClickUser: (userId: number) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onClick,
  chosenUser,
  isFocused,
  onFocusElement,
  onClickUser,
}) => {
  const dropdownMenu = useRef<HTMLDivElement>(null);

  const handleClickOpenMenu = () => {
    onFocusElement(!isFocused);
  };

  const handleClickUser = (user: User) => {
    onClick(user);
    onClickUser(user.id);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownMenu.current &&
        !dropdownMenu.current.contains(e.target as Node)
      ) {
        onFocusElement(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [onFocusElement]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isFocused })}
    >
      <div className="dropdown-trigger" ref={dropdownMenu}>
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClickOpenMenu}
        >
          <span>{chosenUser ? chosenUser.name : 'Choose a user'}</span>

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
              className={classNames('dropdown-item', {
                'is-active': chosenUser?.id === user.id,
              })}
              onClick={() => handleClickUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
