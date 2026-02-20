import React, { useEffect, useRef, useState } from 'react';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

type Props = {
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({ onChange }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isDropdown, setIsDropdown] = useState(false);

  const selectUser = (user: User) => {
    onChange(user);
  };

  useEffect(() => {
    if (selectedUser) {
      selectUser(selectedUser);
    }
  }, [selectedUser]);

  useEffect(() => {
    async function loadUsers(url: string) {
      try {
        const res: User[] = await client.get(url);

        setUsers(res);
      } catch (e) {}
    }

    loadUsers('/users');
  }, []);


  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdown(false);
    }
  };

  document.addEventListener('click', handleClickOutside);

  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${isDropdown ? 'is-active' : ''}`}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdown(!isDropdown)}
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
                className={`dropdown-item ${user.id === selectedUser?.id ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedUser(
                    users.find(userLooking => userLooking.id === user.id),
                  );
                  setIsDropdown(false);
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
