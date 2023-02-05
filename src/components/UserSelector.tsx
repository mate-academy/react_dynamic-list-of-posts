import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types';

type Props = {
  users: User[],
  selectedUser: User | null,
  onSelect: (user: User) => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => setIsOpen(!isOpen);

  const handleSelect = (user: User) => {
    setIsOpen(false);
    onSelect(user);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isOpen },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropDown}
        >
          <span>
            {selectedUser
              ? selectedUser.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { name, id } = user;
            const isSelected = user === selectedUser;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames(
                  'dropdown-item',
                  { 'is-active': isSelected },
                )}
                onClick={() => handleSelect(user)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
