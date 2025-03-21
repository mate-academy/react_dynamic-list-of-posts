import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  onSelect: (userId: number | null) => void;
};

export const UserSelector: React.FC<Props> = ({ users, onSelect }) => {
  const [active, setActive] = useState(false);
  const [activeUser, setActiveUser] = useState(0);
  const [selected, setSelected] = useState('Choose a user');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        active &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [active]);

  const handleClickButton = () => {
    setActive(!active);
  };

  const handleClickLink =
    (user: User) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActive(false);
      setActiveUser(user.id);
      onSelect(user.id);
      setSelected(user.name);
    };

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown', {
        'is-active': active,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClickButton}
        >
          <span>{selected}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': activeUser === user.id,
              })}
              key={user.id}
              onClick={handleClickLink(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
