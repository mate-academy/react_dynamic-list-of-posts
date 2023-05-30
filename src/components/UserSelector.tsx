import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type UserSelectorProps = {
  users: User[];
  setSelectedUser: (user: User) => void;
  selectedUser: User | null;
};

export const UserSelector = ({
  users,
  setSelectedUser,
  selectedUser,
}: UserSelectorProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = (user: User) => {
    setSelectedUser(user);
    setDropdownOpen(false);
  };

  const handleClickOutside = () => {
    if (!dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdownOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>{selectedUser?.name ?? 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div
          className={classNames('dropdown-content', {
            'is-hidden': !dropdownOpen,
          })}
        >
          {users.map((user) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onMouseDown={() => handleClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
