import classNames from 'classnames';
import React, { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUserId: number | null;
  onSelectUserId: (userId: number | null) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onSelectUserId,
}) => {
  const [onOpenListUser, setOnOpenListUser] = useState(false);

  const selectedUser = users.find(
    user => user.id === selectedUserId,
  );

  const toggleUserList = () => {
    setOnOpenListUser(prev => !prev);
  };

  const dropdown = useDetectClickOutside({ onTriggered: toggleUserList });

  const onSelectUser = (userId: number | null) => {
    onSelectUserId(userId);
    toggleUserList();
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': onOpenListUser })}
      ref={dropdown}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleUserList}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={
                classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })
              }
              onClick={() => onSelectUser(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
