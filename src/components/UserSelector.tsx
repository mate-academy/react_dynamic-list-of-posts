import React, { useRef, useState } from 'react';
import { User } from '../types/User';
import { UserLink } from './User/UserLink';
import classNames from 'classnames';
import { useOnClickOutside } from '../customHook/useOnClickOutside';

type Props = {
  selectedUser: number | null;
  handleSelectUser: (id: number) => void;
  users: User[];
};

export const UserSelector: React.FC<Props> = ({
  users,
  handleSelectUser,
  selectedUser,
}) => {
  const [isActive, setIsActive] = useState(false);

  const refButton = useRef<HTMLButtonElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      refButton.current &&
      !refButton.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  useOnClickOutside(refButton, handleClickOutside);

  const handleUserClick = (id: number) => {
    handleSelectUser(id);
    setIsActive(prev => !prev);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          ref={refButton}
          type="button"
          className="button control-close"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(prev => !prev)}
        >
          <span>
            {users.find(user => user.id === selectedUser)?.name ||
              'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <UserLink
              handleUserClick={handleUserClick}
              selectedUser={selectedUser}
              name={user.name}
              id={user.id}
              key={user.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
