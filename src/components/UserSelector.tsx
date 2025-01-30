import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/api';
import classNames from 'classnames';

type Props = {
  onSelectUser: (selectedUserId: number | null) => void;
}

export const UserSelector: React.FC<Props> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers()
      .then(users => {
        setUsers(users);
        setHasError(false);
      })
      .catch(() => {
        setUsers([]);
        setHasError(true);
      });
  }, []);

  const handleUserSelect = (selectedUserId: number | null) => {
    const user = users.find(u => u.id === selectedUserId);
    setSelectedUser(user || null);
    onSelectUser(selectedUserId);
    setIsDropdownOpen(false);
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  // Додаємо слухача подій для кліків поза
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  }

  return (
    <div data-cy="UserSelector" className={classNames("dropdown", {"is-active" : isDropdownOpen})} ref={dropdownRef}>
      {hasError && (
      <div className="notification is-danger" data-cy="UsersLoadingError">
        Something went wrong!
      </div>
      )}

      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          {selectedUser ? selectedUser.name : <span>Choose a user</span>}

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a href={`#user-${user.id}`} className={classNames("dropdown-item", {'is-active' : selectedUser?.id === user.id})} key={user.id} onClick={() => handleUserSelect(user.id)}>
            {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
