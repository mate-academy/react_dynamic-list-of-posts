import React from 'react';
import { useUsers } from '../hooks/useUsers';

export const UserSelector: React.FC = () => {
  const { data: users, isLoading, isError } = useUsers();

  return (
    <div data-cy="UserSelector" className="dropdown is-active">
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

      {!(isError || isLoading || users.length < 1) && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map((user) => (
              <a href={String(user.id)} className="dropdown-item">
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
