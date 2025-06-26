import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import cn from 'classnames';

type Props = {
  onSelect: (user: User) => void;
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({ onSelect, selectedUser }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (u: User) => {
    setIsOpenMenu(false);
    onSelect(u);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpenMenu &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenMenu]);

  useEffect(() => {
    client.get<User[]>('/users').then(result => setUsers(result));
  }, []);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={cn('dropdown', {
        'is-active': isOpenMenu,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpenMenu(prev => !prev)}
        >
          <span>
            {selectedUser !== null ? selectedUser.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(u => (
            <a
              key={u.id}
              href="#user-2"
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === u.id,
              })}
              onClick={() => handleSelect(u)}
            >
              {u.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
