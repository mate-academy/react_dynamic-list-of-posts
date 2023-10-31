import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  choosenUser: User | null,
  handleUserSelect: (user: User) => void,
  // handlePickerClick: () => void,
  // isPickerOpen: boolean;
};

export const UserSelector: React.FC<Props> = React.memo(({
  users,
  choosenUser,
  handleUserSelect,
  // handlePickerClick,
  // isPickerOpen,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsPickerOpen((state) => !state);
          }}
        >
          {choosenUser ? (
            <span>{choosenUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      {isPickerOpen && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div
            className="dropdown-content"
          >
            {users.map(user => {
              return (
                <a
                  key={user.id}
                  href="#user-1"
                  className={cn('dropdown-item', {
                    'is-active': user.name === choosenUser?.name,
                  })}
                  onClick={() => {
                    handleUserSelect(user);
                    setIsPickerOpen(false);
                  }}
                >
                  {user.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});
