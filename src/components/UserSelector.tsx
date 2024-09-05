import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/Users';
import classNames from 'classnames';

interface Props {
  setSelectedUser: (user: User) => void;
  selectedUser: User | null;
}

export const UserSelector: React.FC<Props> = ({
  setSelectedUser,
  selectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsers, setIsUsers] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUsers(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fUsers = await getUsers();

        setUsers(fUsers);
      } catch (error) {
      } finally {
      }
    };

    loadUsers();
  }, []);

  const handleUserSelect = async (user: User) => {
    setSelectedUser(user);
    setIsUsers(!isUsers);
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isUsers })}
    >
      <div className="dropdown-trigger">
        <button
          onClick={() => setIsUsers(!isUsers)}
          onBlur={() => {
            setTimeout(() => setIsUsers(false), 200);
          }}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          {selectedUser ? (
            <span className="dropdown-item">{selectedUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

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
                'is-active': selectedUser?.id === user.id,
              })}
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
