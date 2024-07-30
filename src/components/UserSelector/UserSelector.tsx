import React, { useContext, useState } from 'react';
import { DropdownMenu } from './DropdownMenu/DropdownMenu';
import { User } from '../../types/User';
import { ActiveUserContext } from '../../utils/Store';
import classNames from 'classnames';

interface UserSelectorProp {
  users: User[];
}

export const UserSelector: React.FC<UserSelectorProp> = ({ users }) => {
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
