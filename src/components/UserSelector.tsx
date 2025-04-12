import React, { useState, useEffect } from 'react';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const UserSelector: React.FC<{
  onUserSelect: (userId: number) => void;
}> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    client
      .get<User[]>('/users')
      .then(data => {
        setUsers(data);
        setError(null);
      })
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="notification is-link">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="notification is-danger">
        {error}
        <button
          type="button"
          className="button is-link"
          onClick={() => {
            setError(null);
            setIsLoading(true);
            client
              .get<User[]>('/users')
              .then(data => {
                setUsers(data);
                setError(null);
              })
              .catch(err => {
                // eslint-disable-next-line no-console
                console.error('Error fetching users:', err); // Debugging
                setError('Failed to load users. Please try again later.');
              })
              .finally(() => setIsLoading(false));
          }}
        >
          Retry
        </button>
      </div>
    );
  }

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

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {Array.isArray(users) ? (
            users.map(user => (
              <button
                type="button"
                key={user.id}
                className="dropdown-item"
                role="menuitem"
                onClick={() => onUserSelect(user.id)}
              >
                {user.name}
              </button>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};
