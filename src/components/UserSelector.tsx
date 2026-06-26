import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelected: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelected,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleUserSelect = (user: User) => {
    onSelected(user);
    setIsExpanded(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isExpanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsExpanded(current => !current)}
          onBlur={() => setIsExpanded(false)}
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
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onMouseDown={event => {
                // prevents the trigger's onBlur from closing
                // the dropdown before the click is registered
                event.preventDefault();
              }}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
