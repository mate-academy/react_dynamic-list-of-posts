import React, { useEffect, useState, useRef } from 'react';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

interface Props {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (message: string) => void;
}

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
  setIsLoading,
  setErrorMessage,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    client
      .get<User[]>('/users')
      .then(res => setUsers(res || []))
      .catch(() => setErrorMessage('Unable to load users'))
      .finally(() => setIsLoading(false));

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [setIsLoading, setErrorMessage]);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prev => !prev)}
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
              className={`dropdown-item ${selectedUser?.id === user.id ? 'is-active' : ''}`}
              onClick={e => {
                e.preventDefault();
                setSelectedUser(user);
                setIsOpen(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
