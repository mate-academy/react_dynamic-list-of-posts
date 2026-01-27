import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useOutsideClick } from '../hooks/closeSelector';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelectedUser: (value: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectedUser,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown', {
        'is-active': isOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggle}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href="#user-2"
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              key={user.id}
              onClick={() => {
                setIsOpen(false);
                onSelectedUser(user);
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
