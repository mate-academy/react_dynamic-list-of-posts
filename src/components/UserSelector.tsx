import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  activeUser: User | null;
  setActiveUser: (v: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  activeUser,
  setActiveUser,
}) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const onOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setIsDropDownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onOutsideClick);

    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
    };
  }, []);

  const toggleDropDown = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown', {
        'is-active': users.length > 0 && isDropDownVisible,
      })}
    >
      <div className="dropdown-trigger">
        <button
          onClick={toggleDropDown}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{activeUser ? activeUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        style={{ display: isDropDownVisible ? 'block' : 'none' }}
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === activeUser?.id,
              })}
              key={user.id}
              onClick={() => {
                setActiveUser(user);
                setIsDropDownVisible(false);
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
