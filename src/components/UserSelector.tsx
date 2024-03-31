import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  onSelected?: (user: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  onSelected = () => {},
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    } else {
      setIsDropdownOpen(true);
    }
  };

  const handleDropdown = (user: User) => {
    onSelected(user);
    setSelectedUser(user);
    setIsDropdownOpen(false);
  };

  useClickAway(dropdownMenuRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleButtonClick}
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
        ref={dropdownMenuRef}
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onClick={() => handleDropdown(user)}
              key={user.id}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
