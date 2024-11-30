import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { User } from './types/User';
import { getUsers } from './utils/fetchFunctions';
import { MainContent } from './components/MainContent';
import { Sidebar } from './components/Sidebar';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
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
