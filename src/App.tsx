import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector';
import { SharedProvider } from './SharedContext';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';

export const App: React.FC = () => {
  return (
    <SharedProvider>
      <main className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box is-success">
                <div className="block">
                  <UserSelector />
                </div>
                <MainContent />
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </main>
    </SharedProvider>
  );
};
