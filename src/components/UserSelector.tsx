import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  onUserSelect: (userId: number | null) => void;
};

export const UserSelector: React.FC<Props> = ({ users, onUserSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUser, setIsUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      {' '}
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
          data-cy="UserSelectorButton"
        >
          <span>{isUser?.name || 'Choose a user'}</span>

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
              href="#"
              className={classNames('dropdown-item', {
                'is-active': isUser?.id === user.id,
              })}
              onClick={event => {
                event.preventDefault();
                onUserSelect(user.id);
                setIsOpen(false);
                setIsUser(user);
              }}
              data-cy={`UserSelectorItem-${user.id}`}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
