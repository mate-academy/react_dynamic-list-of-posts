import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUserId: number | null,
  handleSelectedUser: (id: number) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  handleSelectedUser,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const selectedUserName = users.find(({ id }) => id === selectedUserId)?.name;

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div
      ref={menuRef}
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        {
          'is-active': openMenu,
        },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleToggleMenu}
        >
          <span>
            {!selectedUserId
              ? 'Choose a user'
              : selectedUserName}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(({ id, name }) => (
            <a
              key={id}
              href={`#user-${id}`}
              className={classNames(
                'dropdown-item',
                {
                  'is-active': selectedUserId === id,
                },
              )}
              onClick={() => {
                handleSelectedUser(id);
                handleToggleMenu();
              }}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
