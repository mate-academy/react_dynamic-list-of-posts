import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { PostTemplate } from './components/PostTemplate';
import { Sidebar } from './components/Sidebar';

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

              <div className="block" data-cy="MainContent">
                <PostTemplate />
              </div>
            </div>
          </div>

          <Sidebar />
        </div>
      </div>
    </main>
  );
};
