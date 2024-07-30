import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector/UserSelector';
import { getUsers } from './utils/fetchFunctions';
import { User } from './types/User';
import { MainContent } from './components/MainContent/MainContent';
import { SideBar } from './components/Sidebar/SideBar';

export const App: React.FC = () => {
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

          <SideBar />
        </div>
      </div>
    </main>
  );
};
