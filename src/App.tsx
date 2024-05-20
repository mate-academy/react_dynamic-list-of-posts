import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UserSelector } from './components/UserSelector/UserSelector';
import { PostsProvider } from './Context/PostsContext';
import { Main } from './components/Main/Main';
import { Sidebar } from './components/Sidebar/Sidebar';

export const App: React.FC = () => {
  return (
    <PostsProvider>
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
            <Sidebar />
          </div>
        </div>
      </main>
    </PostsProvider>
  );
};
