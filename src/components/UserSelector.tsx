import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  onChange: (userId: number) => void,
};

export const UserSelector: React.FC<Props> = React.memo(({
  users,
  onChange,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleBtnClick = () => {
    setIsActive(state => {
      return !state;
    });
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user.name);
    setIsActive(false);
    onChange(user.id);
  };

  return (
    <div
      data-cy="UserSelector"
      ref={selectRef}
      className={classNames('dropdown', {
        'is-active': isActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleBtnClick}
        >
          <span>
            {selectedUser
              ? `${selectedUser}`
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
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser === user.name,
              })}
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
