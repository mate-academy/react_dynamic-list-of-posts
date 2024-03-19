import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/api';

type Props = {
  selectedUser: User | null;
  onChangeUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  onChangeUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChangeDropdown = () => setIsDropdownActive(!isDropdownActive);

  const handleChangeUser = (currentUser: User) => {
    onChangeUser(currentUser);
    handleChangeDropdown();
  };

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleChangeDropdown}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        ref={dropdownRef}
      >
        <div
          className="dropdown-content"
          style={{ height: 600, overflow: 'auto' }}
        >
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === id,
                })}
                onClick={() => handleChangeUser(user)}
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
