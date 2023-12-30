import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const UserSelector: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const list = await client.get('/users');

      setUsers(list as User[]);
    };

    getUsers();
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className="dropdown is-active"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((item) => (
            <a href={`#user-${item.id}`} className="dropdown-item is-active">{item.name}</a>
          ))}

        </div>
      </div>
    </div>
  );
};
