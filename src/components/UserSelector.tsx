import React, { useEffect, useRef, useState } from 'react';
import { client } from '../utils/fetchClient';
import { useUserContext } from './Context/Context';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const {
    users,
    setUsers,
    showUsers,
    setShowUsers,
    setUserSelected,
    setErrorUsers,
  } = useUserContext();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [dropdownValue, setDropdownValue] = useState<string>('Choose a user');

  const dropUsersList = () => {
    setShowUsers(!showUsers);
  };

  const selectUser = (user: User) => {
    setUserSelected(user);
    setShowUsers(false);
    setDropdownValue(user.name);
  };

  useEffect(() => {
    client.get('/users')
      .then((response: unknown) => {
        setUsers(response as User[]);
      })
      .catch(() => {
        setErrorUsers('Error loading users');
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (dropdownRef.current && !dropdownRef
        .current.contains(event.target as Node)) {
        setShowUsers(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={dropUsersList}
        >
          <span>{dropdownValue}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {showUsers && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          {users && (
            <div className="dropdown-content">
              {users?.map(user => (
                <a
                  href={`#user-${user.id}`}
                  className="dropdown-item"
                  key={user.id}
                  onClick={() => selectUser(user)}
                >
                  {user.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
