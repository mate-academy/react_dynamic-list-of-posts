import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onSelectedUser: (id: number) => void;
  selectedUser: number | null;
  setIsOpenSidebar: (val: null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onSelectedUser,
  selectedUser,
  setIsOpenSidebar,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleSelectUser = (id: number) => {
    onSelectedUser(id);
    setIsOpen(false);
    setIsOpenSidebar(null);
  };

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleOpenMenu}
          onBlur={() => setIsOpen(false)}
        >
          <span>
            {selectedUser
              ? users.find(us => us.id === selectedUser)?.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {(isOpen && !!users) && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map(user => {
              const { id, name } = user;

              return (
                <a
                  href={`#user-${id}`}
                  className={cn('dropdown-item', {
                    'is-active': selectedUser === id,
                  })}
                  onMouseDown={() => handleSelectUser(id)}
                  key={id}
                >
                  {name}
                </a>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
