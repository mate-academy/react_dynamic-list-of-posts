import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import { User } from '../../types/User';
import { ActiveUserContext } from '../../utils/Store';
import { DropdownMenu } from './DropdownMenu';

interface UserSelectorProps {
  users: User[];
}

export const UserSelector: React.FC<UserSelectorProps> = ({ users }) => {
  const [isActive, setIsActive] = useState(false);
  const { activeUser } = useContext(ActiveUserContext);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          tabIndex={0}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => (isActive ? setIsActive(false) : setIsActive(true))}
          onBlur={event => {
            event.preventDefault();
            setIsActive(false);
          }}
        >
          <span>{activeUser ? activeUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <DropdownMenu users={users} setIsActive={setIsActive} />
    </div>
  );
};
