import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import classNames from 'classnames';

interface Props {
  selectUser: (user: User | null) => void;
  selectedUser: User | null;
}

export const UserSelector: React.FC<Props> = ({ selectUser, selectedUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    client.get<User[]>('/users').then(data => setUsers(data));
  }, []);

  const handleUserSelect = (user: User) => {
    selectUser(user);
    setIsActive(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.relatedTarget)
    ) {
      setIsActive(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(prev => !prev)}
          onBlur={handleBlur}
        >
          <span>{selectedUser?.name || `Choose a user`}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              key={user.id}
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
