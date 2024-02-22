import cn from 'classnames';
import React, { useState } from 'react';
import { User } from '../types';
import { UserInfo } from './UserInfo';

type Props = {
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  users: User[];
  selectedUser: User | null;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser, users, setSelectedUser,
}) => {
  const [isActive, setIsActive] = useState(false);
  const buttonText = selectedUser ? selectedUser.name : 'Choose a user';

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onBlur={() => setIsActive(false)}
          onClick={() => setIsActive(prev => !prev)}
        >

          <span>{buttonText}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <UserInfo
              key={user.id}
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
