import React from 'react';
import cn from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[] | null,
  choosenUser: User | null,
  handleChoosenUser: (user: User) => void,
  handlePickerClick: () => void,
  isPickerOpen: boolean;
};

export const UserSelector: React.FC<Props> = React.memo(({
  users,
  choosenUser,
  handleChoosenUser,
  handlePickerClick,
  isPickerOpen,
}) => {
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
            handlePickerClick();
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
            {users?.map(user => {
              return (
                <a
                  key={user.id}
                  href="#user-1"
                  className={cn('dropdown-item', {
                    'is-active': user.name === choosenUser?.name,
                  })}
                  onClick={() => {
                    handleChoosenUser(user);
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
