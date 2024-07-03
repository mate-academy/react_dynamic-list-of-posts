import React, { useState } from 'react';
import { User } from '../types/User';
import { UserSelectorItem } from './UserSelectorItem';
import { SelectedUser } from '../types/types';
import classNames from 'classnames';
import { HandleUserSelect } from '../types/handlers';

type Props = {
  users: User[];
  selectedUser: SelectedUser;
  onUserSelect: HandleUserSelect;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onUserSelect,
}) => {
  const [isUserSelectorActive, setIsUserSelectorActive] = useState(false);

  const handleUserSelectorClick = () =>
    setIsUserSelectorActive(
      prevIsUserSelectorActive => !prevIsUserSelectorActive,
    );

  const handleUserSelectorBlur = () => setIsUserSelectorActive(false);

  const handleUserSelectorItemClick = (userId: number) => {
    setIsUserSelectorActive(false);
    onUserSelect(userId);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isUserSelectorActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleUserSelectorClick}
          onBlur={handleUserSelectorBlur}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <UserSelectorItem
              key={user.id}
              user={user}
              isSelected={user.id === selectedUser?.id}
              onUserSelectorItemClick={handleUserSelectorItemClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
