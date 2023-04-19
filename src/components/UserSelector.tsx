import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[],
  selectedUserId: number | null,
  setSelectedUserId: (id: number) => void,
  loadPostsOfUser: (userId: number) => void,
  clearError: () => void,
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  setSelectedUserId,
  loadPostsOfUser,
  clearError,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('Choose a user');

  const onClickDropdown = () => {
    setIsDropdownActive(prev => !prev);
  };

  const onChooseUser = (id: number, name: string) => {
    setSelectedUserId(id);
    setSelectedUserName(name);
    setIsDropdownActive(false);
    loadPostsOfUser(id);
    clearError();
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames(
        'dropdown',
        { 'is-active': isDropdownActive },
      )}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={onClickDropdown}
        >
          <span>{selectedUserName}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        hidden={isDropdownActive}
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                { 'is-active': user.id === selectedUserId },
              )}
              key={user.id}
              onClick={() => onChooseUser(user.id, user.name)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
