import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
type Props = {
  allUsers: User[];
  activeUser: User | null;
  onChangeActiveUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  allUsers,
  activeUser,
  onChangeActiveUser,
}) => {
  const [showDropdownItems, setShowDropdownItems] = useState(false);
  const dropDownMenu = useRef<HTMLDivElement | null>(null);

  function clickOnUser(user: User) {
    onChangeActiveUser(user);
    setShowDropdownItems(false);
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropDownMenu.current &&
        e.target instanceof Node &&
        !dropDownMenu.current.contains(e.target)
      ) {
        setShowDropdownItems(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': showDropdownItems })}
      ref={dropDownMenu}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setShowDropdownItems(cur => !cur)}
        >
          <span>{activeUser ? activeUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {allUsers.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === activeUser?.id,
              })}
              onClick={() => clickOnUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
