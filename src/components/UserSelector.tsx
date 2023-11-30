import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { useOutsideClick } from '../hooks/useOutsideClick';

type Props = {
  user?: User;
  onSelect?: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  user: selectedUser,
  onSelect = () => {},
}) => {
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleSelectUser = (user: User) => {
    onSelect(user);
    setIsActive(false);
  };

  useOutsideClick(dropdownRef, setIsActive);

  useEffect(() => {
    client.get('/users').then(data => {
      setUsers(data as User[]);
    });
  }, []);

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
          onClick={() => setIsActive(!isActive)}
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
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleSelectUser(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
