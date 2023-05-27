import { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type UserSelectorProps = {
  users: User[];
  setSelectedUser: (id: number) => void;
  selectedUserName?: string;
};

export const UserSelector = ({
  users,
  setSelectedUser,
  selectedUserName = 'Choose a user',
}: UserSelectorProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = (id: number) => {
    setSelectedUser(id);
    setDropdownOpen(false);
  };

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>{selectedUserName}</span>

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
          {users.map(({ name, id }) => (
            <a
              key={id}
              href="#user-1"
              className="dropdown-item"
              onClick={() => handleClick(id)}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
