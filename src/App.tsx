import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { Main } from './components/Main';

import { SideBar } from './components/SideBar';
import { UserSelector } from './components/UserSelector';

export const App: React.FC = () => {
  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <Main />
            </div>
          </div>

          <SideBar />
        </div>
      </div>
    </main>
  );
};
