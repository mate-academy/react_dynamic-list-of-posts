import React, { useState } from 'react';
import { User } from '../../types/User';
import classNames from 'classnames';
import { Loader } from '../Loader';

interface Props {
  users: User[];
  selectedUser: number | null;
  setSelectedUser: (userId: number) => void;
  loading: boolean;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
  loading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentName = users.find(user => user.id === selectedUser);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelectedUser = (userId: number) => {
    setSelectedUser(userId);
    setIsOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>{currentName?.name || 'Choose a user'}</span>
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
                'is-active': selectedUser === user.id,
              })}
              onClick={() => handleSelectedUser(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};
