import React from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUserId: number;
  isOpened: boolean;
  selectedUser?: User;
  onOpened: (isOpened: boolean) => void;
  onUserSelect: (
    event: React.MouseEvent<HTMLAnchorElement>,
    userId: number,
  ) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  isOpened,
  selectedUser,
  onOpened,
  onUserSelect,
}) => {
  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpened })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => onOpened(true)}
          onBlur={() => onOpened(false)}
        >
          <span>
            {selectedUserId === -1 ? 'Choose a user' : selectedUser?.name}
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
              href={`#user-${user.id}`}
              key={user.id}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onMouseDown={event => onUserSelect(event, user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
