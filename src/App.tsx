import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUsers } from './api/users';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(fetchedUsers => {
        setUsers(fetchedUsers);
      })
      .catch(() => {
        setError('Unable to load users');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {!loading && !error && users.length > 0 && (
                  <UserSelector users={users} />

                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
