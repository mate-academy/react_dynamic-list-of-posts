import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { User } from '../../types/User';

interface Props {
  users: User[];
  onSelect: (id: number) => void;
}

export const UserSelector: React.FC<Props> = ({ users, onSelect }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOnSelect = (user: User) => {
    setIsActive(false);
    setSelectedUser(user);
    onSelect(user.id);
  };

  const handleOnBlur = (event: React.FocusEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.relatedTarget as Node)
    ) {
      setIsActive(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
          onBlur={handleOnBlur}
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
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUser && user.id === selectedUser.id,
              })}
              onClick={() => handleOnSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
