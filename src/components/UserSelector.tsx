import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types/User';
import cn from 'classnames';

type Props = {
  users: User[];
  currUser: User | null;
  setCurrUser: (currUser: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  currUser,
  setCurrUser,
}) => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const dropdownRef = useRef(null);

  const onOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setMenuIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onOutsideClick);

    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
    };
  }, []);

  const selectUserFunc = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    user: User,
  ) => {
    e.preventDefault();
    setCurrUser(user);
    setMenuIsVisible(false);
  };

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={cn('dropdown', {
        'is-active': users.length > 0 && menuIsVisible,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setMenuIsVisible(true)}
        >
          <span>
            {currUser && currUser.name.length > 0
              ? currUser.name
              : 'Choose a user'}
          </span>

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
              href={`user-${user.id}`}
              onClick={e => selectUserFunc(e, user)}
              className={cn('dropdown-item', {
                'is-active': user.id === currUser?.id,
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
