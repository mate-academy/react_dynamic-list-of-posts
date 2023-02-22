import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../../types/User';

type Props = {
  users: User[];
  selectedUserId: number;
  handleSelectUser: (userId: number) => void;
};
export const UserSelector: React.FC<Props> = React.memo(({
  users,
  selectedUserId,
  handleSelectUser,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedUser = users.find(user => user.id === selectedUserId);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    userId: number,
  ) => {
    event.preventDefault();
    handleSelectUser(userId);
    setIsDropdownOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsDropdownOpen(prevState => !prevState);
          }}
        >
          <span>
            {!selectedUser
              ? 'Choose a user'
              : selectedUser.name}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`/#user-${user.id}`}
              className={cn('dropdown-item',
                { 'is-active': selectedUserId === user.id })}
              onClick={(event) => {
                handleClick(event, user.id);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
