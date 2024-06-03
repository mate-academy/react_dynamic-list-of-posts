import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  selectedUser: User | null;
  onSelect: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  onSelect,
}) => {
  const [isListVisible, setIsListVisible] = useState(false);

  const handleChoosingUser = (user: User) => {
    setIsListVisible(false);
    onSelect(user);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isListVisible,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsListVisible(!isListVisible)}
          onBlur={() => setIsListVisible(false)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
              href="#"
              className={classNames('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              onMouseDown={() => handleChoosingUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
