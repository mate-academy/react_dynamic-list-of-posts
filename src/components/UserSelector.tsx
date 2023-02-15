import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUser: User | null,
  isDropDownActive: boolean,
  toggleDropDown: () => void,
  selectDropDownItem: (user: User, userId: number) => void,
  selectedUserId: number,
  closeDropDown: () => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  isDropDownActive,
  toggleDropDown,
  selectDropDownItem,
  selectedUserId,
  closeDropDown,
}) => {
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
        closeDropDown();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      data-cy="UserSelector"
      className={cn(
        'dropdown',
        { 'is-active': isDropDownActive },
      )}
    >
      <div
        className="dropdown-trigger"
        ref={setDropdownRef}
      >
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

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div
          className="dropdown-content"
        >
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={cn(
                'dropdown-item',
                { 'is-active': selectedUserId === user.id },
              )}
              onClick={(event) => {
                event.preventDefault();
                selectDropDownItem(user, user.id);
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
