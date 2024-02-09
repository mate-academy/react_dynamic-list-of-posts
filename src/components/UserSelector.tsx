import React, { useState } from 'react';
import { effect } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import classNames from 'classnames';
import { selectedUser, users } from '../signals/signals';
import { getUsers } from '../api';
import { User } from '../types/User';

effect(() => {
  getUsers()
    .then(response => {
      users.value = response;
    })
    .catch(() => {
      users.value = [];
    });
});

export const UserSelector: React.FC = () => {
  useSignals();

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleSelectUser = (
    event: React.MouseEvent<HTMLAnchorElement>,
    user: User,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    selectedUser.value = user;
    setIsDropdownActive(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
          onBlur={() => setIsDropdownActive(false)}
        >
          <span>
            {selectedUser.value
              ? selectedUser.value.name
              : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.value.map(user => (
            <a href={`#user-${user.id}`} className={classNames('dropdown-item', { 'is-active': user.id === selectedUser.value?.id })} key={user.id} onMouseDown={e => handleSelectUser(e, user)}>{user.name}</a>
          ))}
        </div>
      </div>
    </div>
  );
};
