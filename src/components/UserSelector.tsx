import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  clients: User[];
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserSelector: React.FC<Props> = ({
  clients,
  selectedUser,
  setSelectedUser,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = () => setOpenMenu(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': openMenu })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenMenu}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {clients.map(client => (
            <a
              key={client.id}
              href={`#user-${client.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === client.id,
              })}
              onClick={e => {
                e.preventDefault();
                setSelectedUser(client);
                setOpenMenu(false);
              }}
            >
              {client.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
