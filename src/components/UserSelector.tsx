import React, { useState } from 'react';
import cn from 'classnames';

import { User } from '../types';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': isOpened })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onBlur={() => setIsOpened(false)}
          onClick={() => setIsOpened(current => !current)}
        >
          <span>{selectedUser ? selectedUser?.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            const isSelected = id === selectedUser?.id;

            return (
              <a
                href={`#user-${id}`}
                className={cn('dropdown-item', { 'is-active': isSelected })}
                key={id}
                onMouseDown={() => onSelectUser(user)}
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
