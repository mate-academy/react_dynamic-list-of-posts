import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { Sidebar } from './components/Sidebar';
import { UserSelector } from './components/UserSelector';
import { MainContent } from './components/MainContent';

import { User } from './types/User';
import { getUsers } from './api/api';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const serverUsers = await getUsers();

        setUsers(serverUsers);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} />
              </div>

              <MainContent />

            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </main>
  );
};
