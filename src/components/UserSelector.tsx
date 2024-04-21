import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  userId: number;
  onSelect: (id: number) => void;
};

export const UserSelector: React.FC<Props> = ({ users, userId, onSelect }) => {
  const [isPressed, setIsPressed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');

  function handleClick(user: User) {
    setIsPressed(false);
    onSelect(user.id);
    setName(user.name);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsPressed(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isPressed,
      })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsPressed(!isPressed)}
        >
          <span>{name ? name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div
          className={classNames('dropdown-content', {
            'is-active': isPressed,
          })}
        >
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': userId === user.id,
              })}
              key={user.id}
              onClick={() => handleClick({id, name})}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
