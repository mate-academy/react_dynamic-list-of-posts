import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  setIsUser: (a: boolean) => void;
  setUserId: (a: number | null) => void;
  setOpenPostId: (a: null | number) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  setIsUser,
  setUserId,
  setOpenPostId,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isActiveUserId, setIsActiveUserId] = useState(0);
  const [userName, setUserName] = useState('');

  const handleClickDropdown = () => {
    setIsActive(!isActive);
  };

  const handleShowUsersPosts = (
    event: React.MouseEvent<HTMLAnchorElement>,
    userId: number,
  ) => {
    event.preventDefault();
    setOpenPostId(null);
    setIsActiveUserId(userId);
    setIsUser(true);
    setUserId(userId);

    setUserName(event.currentTarget.innerHTML);
    setIsActive(false);
  };

  const handleCloseDropdown = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsActive(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
      onBlur={handleCloseDropdown}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClickDropdown}
        >
          <span>{userName ? userName : 'Choose a user'}</span>

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
                'is-active': isActiveUserId === user.id,
              })}
              onClick={event => handleShowUsersPosts(event, user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
